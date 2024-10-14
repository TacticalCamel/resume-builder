import { getVariable } from "@/functions/Css";
import { Font } from "@/models/style/Font";

const HTML_SELECTOR: string = 'html';
const FONT_VARIABLE_NAME: string = '--font-family';

// get the initial font value from CSS
function getDefaultFont(): string {
    const value: string | undefined = getVariable(HTML_SELECTOR, FONT_VARIABLE_NAME);

    if (!value) {
        return 'sans-serif';
    }

    return value.replace(/"/g, '');
}

export async function getSystemFonts(): Promise<string[]> {
    if (!('queryLocalFonts' in window) || typeof window.queryLocalFonts !== 'function') {
        return [];
    }

    const localFonts: { family: string, fullName: string, postscriptName: string, style: string }[] = await window.queryLocalFonts();

    return localFonts
        .filter(font => font.style === 'Regular')
        .map(font => font.fullName);
}

export function applyFont(font: Font): void {
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

export function applyFonts(fonts: Font[]): void {
    for (const font of fonts) {
        applyFont(font);
    }
}

export const defaultFont: string = getDefaultFont();