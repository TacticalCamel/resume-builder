import { Ref } from "vue";
import { ReactiveQuery, useReactiveQuery } from "@/composables/ReactiveQuery";
import { usePersistentRef } from "@/composables/PersistentRef";
import { useDatabase } from "@/composables/Database";
import { EntityTable, Transaction } from "dexie";
import Font from "@/models/style/Font";
import { CssUtils } from "@/css-utils";

let instance: IFontService | undefined;

export function useFontService(): IFontService {
    if (instance) {
        return instance;
    }

    const db = useDatabase();
    const defaultFont = CssUtils.getDefaultFont();

    instance = new FontService(
        usePersistentRef<string>('current-font', () => defaultFont),
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

export interface IFontService {
    get currentFont(): string
    set currentFont(font: string)

    get customFonts(): Font[]

    get systemFonts(): Font[]

    get canLoadSystemFonts(): boolean

    loadSystemFonts(): Promise<void>
    addCustomFont(font: Font): Promise<void>
}

class FontService implements IFontService {
    private readonly _currentFont: Ref<string>
    private readonly _fonts: EntityTable<Font, 'name'>
    private readonly _customFonts: ReactiveQuery<Font[]>
    private readonly _systemFonts: ReactiveQuery<Font[]>

    constructor(currentFontStore: Ref<string>, fonts: EntityTable<Font, 'name'>) {
        this._currentFont = currentFontStore;
        this._fonts = fonts;
        this._customFonts = useReactiveQuery(() => this._fonts.where('system').equals(0).toArray(), this.applyCustomFonts);
        this._systemFonts = useReactiveQuery(() => this._fonts.where('system').notEqual(0).toArray());
    }

    get customFonts(): Font[] {
        return this._customFonts.value ?? [];
    }

    get systemFonts(): Font[] {
        return this._systemFonts.value ?? [];
    }

    get currentFont(): string {
        return this._currentFont.value;
    }

    set currentFont(value: string) {
        this._currentFont.value = value;
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

    async addCustomFont(font: Font): Promise<void> {
        if (await this._fonts.get(font.name)) {
            return;
        }

        await this._fonts.add(font);
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