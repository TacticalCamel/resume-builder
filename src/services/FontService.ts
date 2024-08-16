import LocalStorageAutosaveService from "@/services/LocalStorageAutosaveService";
import FontData from "@/models/FontData";

export default class FontService {
    private readonly font: LocalStorageAutosaveService<string | null>;
    private readonly cssFontVariable: string;
    readonly defaultFont: string;

    constructor(cssFontVariable: string) {
        this.font = new LocalStorageAutosaveService<string | null>('current-font', () => null);
        this.cssFontVariable = cssFontVariable;
        this.defaultFont = getCssVariable('html', cssFontVariable)?.replace(/"/g, '') ?? 'sans-serif';
    }

    get currentFont(): string {
        return this.font.value ?? this.defaultFont;
    }

    set currentFont(value: string) {
        this.font.value = value;
        this.applyFont(value);
    }

    applyFont(font: string): void {
        const element: HTMLElement | null = document.getElementById('editor-content');

        if (!element) {
            return;
        }

        element.style.setProperty(this.cssFontVariable, font);
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