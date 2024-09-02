import IFontService from "@/services/interfaces/IFontService";
import Font from "@/models/style/Font";
import IAsyncObjectStore from "@/services/interfaces/IAsyncCollectionStore";
import LocalStorageAutosaveService from "@/services/implementations/LocalStorageAutosaveService";

export default class FontService implements IFontService {
    private readonly systemFontsStore: IAsyncObjectStore<Font, string>
    private readonly customFontsStore: IAsyncObjectStore<Font, string>
    private readonly currentFontStore: LocalStorageAutosaveService<string>

    constructor(systemFontsStore: IAsyncObjectStore<Font, string>, customFontsStore: IAsyncObjectStore<Font, string>, currentFontStore: LocalStorageAutosaveService<string>) {
        this.systemFontsStore = systemFontsStore;
        this.customFontsStore = customFontsStore;
        this.currentFontStore = currentFontStore;
    }

    get currentFont(): string {
        return this.currentFontStore.value;
    }

    get systemFonts(): Promise<Font[]> {
        return this.systemFontsStore.readAll();
    }

    get customFonts(): Promise<Font[]> {
        return this.customFontsStore.readAll();
    }

    set currentFont(value: string) {
        this.currentFontStore.value = value;
    }

    get canLoadSystemFonts(): boolean {
        return 'queryLocalFonts' in window && typeof window.queryLocalFonts === 'function';
    }

    private static async getSystemFonts(): Promise<FontData[]> {
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
        const fonts: FontData[] = await FontService.getSystemFonts();

        for (const font of fonts) {
            if(font.style !== 'Regular') {
                continue;
            }

            if (await this.systemFontsStore.readOne(font.fullName)){
                continue;
            }

            await this.systemFontsStore.create({
                name: font.fullName,
                data: undefined
            });
        }
    }

    async addCustomFont(font: Font): Promise<void> {
        await this.customFontsStore.create(font);
    }
}

interface FontData {
    family: string;
    fullName: string;
    postscriptName: string;
    style: string;
}