import IFontService from "@/services/interfaces/IFontService";
import IValueStore from "@/services/interfaces/IValueStore";
import Font from "@/models/Font";

export default class FontService implements IFontService {
    private readonly systemFontsStore: IValueStore<Font[]>
    private readonly customFontsStore: IValueStore<Font[]>
    private readonly currentFontStore: IValueStore<string>

    constructor(systemFontsStore: IValueStore<Font[]>, customFontsStore: IValueStore<Font[]>, currentFontStore: IValueStore<string>) {
        this.systemFontsStore = systemFontsStore;
        this.customFontsStore = customFontsStore;
        this.currentFontStore = currentFontStore;
    }

    get currentFont(): string {
        return this.currentFontStore.value;
    }

    get systemFonts(): Font[] {
        return this.systemFontsStore.value;
    }

    get customFonts(): Font[] {
        return this.customFontsStore.value;
    }

    set currentFont(value: string) {
        this.currentFontStore.value = value;
    }

    get canLoadSystemFonts(): boolean {
        return 'queryLocalFonts' in window && typeof window.queryLocalFonts === 'function';
    }

    private static async getLocalFonts(): Promise<FontData[]> {
        if (!('queryLocalFonts' in window) || typeof window.queryLocalFonts !== 'function') {
            return Promise.resolve([]);
        }

        try {
            return window.queryLocalFonts();
        }
        catch (error) {
            return Promise.resolve([]);
        }
    }

    async loadSystemFonts(): Promise<void> {
        const allFonts: FontData[] = await FontService.getLocalFonts();

        const localFonts: string[] = allFonts
            .filter(font => font.style === 'Regular')
            .map(font => font.fullName);

        for (const localFont of localFonts) {
            if(!this.systemFontsStore.value.some(font => font.name === localFont)) {
                this.systemFontsStore.value.push({name: localFont, data: undefined});
            }
        }
    }
}

interface FontData {
    family: string;
    fullName: string;
    postscriptName: string;
    style: string;
}