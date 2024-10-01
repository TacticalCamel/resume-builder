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

        const systemFonts: { family: string, fullName: string, postscriptName: string, style: string }[] = await window.queryLocalFonts();
        const existingFonts: Font[] = await table.where('system').equals('true').toArray();

        for (const fontData of systemFonts) {
            if (fontData.style !== 'Regular') {
                continue;
            }

            if (existingFonts.some(font => font.name === fontData.fullName)) {
                continue;
            }

            const font: Font = {
                name: fontData.fullName,
                data: undefined,
                system: 1
            };

            await table.add(font);
        }
    }

    function applyFonts(fonts: Font[]): void {
        for (const font of fonts) {
            if (!font.data) {
                continue;
            }

            const fontFace: FontFace = new FontFace(font.name, font.data);

            if (!document.fonts.has(fontFace)) {
                document.fonts.add(fontFace);
            }
        }
    }

    return {
        systemFonts,
        canLoadSystemFonts,
        loadSystemFonts,
        applyFonts
    };
}