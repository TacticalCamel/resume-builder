import LocalStorageAutosaveService from "@/services/LocalStorageAutosaveService";
import FontData from "@/models/FontData";

export default class FontService {
    private readonly current: LocalStorageAutosaveService<string>;
    readonly defaultFont: string;
    readonly fonts: LocalStorageAutosaveService<string[]>;

    constructor(cssFontVariable: string) {
        this.defaultFont = getCssVariable('html', cssFontVariable)?.replace(/"/g, '') ?? 'sans-serif';

        this.current = new LocalStorageAutosaveService<string>('current-font', () => this.defaultFont);
        this.fonts = new LocalStorageAutosaveService<string[]>('fonts', () => [this.defaultFont]);
    }

    get currentFont(): string {
        return this.fonts.value.find(font => font === this.current.value) ?? this.defaultFont;
    }

    set currentFont(value: string) {
        this.current.value = value;
    }

    static async getLocalFonts(): Promise<FontData[]> {
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

    static get isQueryLocalFontsSupported(): boolean {
        return 'queryLocalFonts' in window && typeof window.queryLocalFonts === 'function';
    }
}

function getCssVariable(selector: string, variableName: string): string | null {
    // iterate over all the style sheets
    for (let i = 0; i < document.styleSheets.length; i++) {
        // get the current style sheet
        const sheet: CSSStyleSheet = document.styleSheets[i];

        // skip external style sheets
        if (sheet.href != null && !sheet.href.startsWith(window.location.origin)) {
            continue;
        }

        for (let j = 0; j < sheet.cssRules.length; j++) {
            // get the current rule
            const rule: CSSRule = sheet.cssRules[j];

            // skip non-style rules
            if (!(rule instanceof CSSStyleRule)) {
                continue;
            }

            // skip rules that are not in the specified selector
            if (rule.selectorText !== selector) {
                continue;
            }

            // iterate over all the properties
            for (let k = 0; k < rule.style.length; k++) {
                // get the current property name
                const name: string = rule.style[k];

                // if the property name is the specified variable name,
                // return the property value
                if (name === variableName) {
                    return rule.style.getPropertyValue(name);
                }
            }
        }
    }

    return null;
}