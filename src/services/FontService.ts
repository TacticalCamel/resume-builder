import AutosaveService from "@/services/AutosaveService";
import FontData from "@/models/FontData";

export default class FontService {
    private readonly font: AutosaveService<string | null>;
    readonly defaultFont = 'Inter';

    constructor() {
        this.font = new AutosaveService<string | null>('currentFont', () => null);
    }

    get currentFont(): string {
        return this.font.value ?? this.defaultFont;
    }

    set currentFont(value: string | null) {
        this.font.value = value;
        this.applyFont(value);
    }

    applyFont(font: string | null): void {
        const element: HTMLElement | null = document.getElementById('editor-content');

        element?.style.setProperty('--font-family', font ?? this.defaultFont);
    }

    static async getInstalledFonts(): Promise<FontData[]> {
        if (!('queryLocalFonts' in window) || typeof window.queryLocalFonts !== 'function') {
            return [];
        }

        try {
            return window.queryLocalFonts();
        }
        catch (err) {
            return [];
        }
    }
}