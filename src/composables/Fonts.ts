import { useDatabase } from "@/composables/Database";
import { useStyleSheet } from "@/composables/StyleSheet";
import { EntityTable, Transaction } from "dexie";
import { ReactiveQuery, useReactiveQuery } from "@/composables/ReactiveQuery";
import { Font } from "@/models/style/Font";

export function useFonts() {
    const db = useDatabase();
    const {defaultFont} = useStyleSheet();
    const table: EntityTable<Font, 'name'> = db.fonts;

    db.on('populate', (transaction: Transaction) => {
        transaction.table<Font, string>('fonts').add({
            name: defaultFont,
            system: 0,
            data: undefined
        });
    });

    const systemFonts: ReactiveQuery<Font[]> = useReactiveQuery(() => table.where('system').notEqual(0).toArray());
    const canLoadSystemFonts: boolean = 'queryLocalFonts' in window && typeof window.queryLocalFonts === 'function';

    async function loadSystemFonts(): Promise<void> {
        if (!('queryLocalFonts' in window) || typeof window.queryLocalFonts !== 'function') {
            return;
        }

        const localFonts: { family: string, fullName: string, postscriptName: string, style: string }[] = await window.queryLocalFonts();
        const fonts: Font[] = [];

        for (const fontData of localFonts) {
            if (fontData.style !== 'Regular') {
                continue;
            }

            if (systemFonts.value?.some(font => font.name === fontData.fullName)) {
                continue;
            }

            fonts.push({
                name: fontData.fullName,
                data: undefined,
                system: 1
            });
        }

        await table.bulkAdd(fonts);
    }

    function applyFont(font: Font): void {
        // font should already be loaded, like system fonts or fonts imported in css
        if (!font.data) {
            return;
        }

        // create a font face
        const fontFace: FontFace = new FontFace(font.name, font.data);

        // load the font if it's not already present
        if (!document.fonts.has(fontFace)) {
            document.fonts.add(fontFace);
        }
    }

    function applyFonts(fonts: Font[]): void {
        for (const font of fonts) {
            applyFont(font);
        }
    }

    return {
        systemFonts,
        canLoadSystemFonts,
        loadSystemFonts,
        applyFont,
        applyFonts
    };
}