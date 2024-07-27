import { Ref, ref } from "vue";
import AutosaveService from "@/services/AutosaveService";

export default class FontService {
    private readonly font: AutosaveService<string | null>;
    readonly availableFonts: Ref<string[]>;
    readonly defaultFont = 'Inter';

    constructor() {
        this.font = new AutosaveService<string | null>('currentFont', () => null);
        this.availableFonts = ref<string[]>([
            'Arial',
            'Georgia',
            'Lucida Sans Unicode',
            'Palatino Linotype',
            'Tahoma',
            'Times New Roman',
            'Trebuchet MS',
            'Verdana'
        ]);
    }

    get currentFont(): string {
        return this.font.value ?? this.defaultFont;
    }

    set currentFont(value: string | null) {
        this.font.value = value;
        this.applyFont(value);
    }

    applyFont(font: string | null): void {
        document.documentElement.style.setProperty('--font-family', font ?? this.defaultFont);
    }
}