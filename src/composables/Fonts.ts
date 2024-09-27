import { EntityTable, Transaction } from "dexie";
import { ReactiveQuery, useReactiveQuery } from "@/composables/ReactiveQuery";
import { useDatabase } from "@/composables/Database";
import { getDefaultFont } from "@/composables/CssUtils";
import { Font } from "@/models/style/Font";

let instance: FontService | undefined;

export function useFonts() {
    if (instance) {
        return instance;
    }

    const db = useDatabase();
    const defaultFont = getDefaultFont();

    instance = new FontService(
        db.fonts
    );

    db.on('populate', (transaction: Transaction) => {
        transaction.table<Font, string>('fonts').add({
            name: defaultFont,
            system: 0,
            data: undefined
        });
    });

    return instance;
}

class FontService {
    private readonly _fonts: EntityTable<Font, 'name'>
    private readonly _systemFonts: ReactiveQuery<Font[]>

    constructor(fonts: EntityTable<Font, 'name'>) {
        this._fonts = fonts;
        this._systemFonts = useReactiveQuery(() => this._fonts.where('system').notEqual(0).toArray());
    }

    get systemFonts(): Font[] {
        return this._systemFonts.value ?? [];
    }

    get canLoadSystemFonts(): boolean {
        return 'queryLocalFonts' in window && typeof window.queryLocalFonts === 'function';
    }

    async loadSystemFonts(): Promise<void> {
        if (!('queryLocalFonts' in window) || typeof window.queryLocalFonts !== 'function') {
            return;
        }

        const systemFonts: { family: string, fullName: string, postscriptName: string, style: string }[] = await window.queryLocalFonts();
        const existingFonts: Font[] = await this._fonts.where('system').equals('true').toArray();

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

            await this._fonts.add(font);
        }
    }

    private applyCustomFonts(customFonts: Font[]): void {
        for (const font of customFonts) {
            if (!font.data) {
                continue;
            }

            const fontFace: FontFace = new FontFace(font.name, font.data);

            if (!document.fonts.has(fontFace)) {
                document.fonts.add(fontFace);
            }
        }
    }
}