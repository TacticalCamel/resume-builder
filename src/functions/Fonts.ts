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

function createFontFace(font: Font): FontFace | undefined {
    // font data is from other sources, can not proceed
    if (!font.data) {
        return undefined;
    }

    // create a font face
    return new FontFace(font.name, font.data);
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
    // create a font face
    const fontFace: FontFace | undefined = createFontFace(font);

    // load the font if it's not already present
    if (fontFace && !document.fonts.has(fontFace)) {
        document.fonts.add(fontFace);
    }
}

export function unloadFont(font: Font): void {
    const fontFace: FontFace | undefined = createFontFace(font);

    if(fontFace) {
        document.fonts.delete(fontFace);
    }
}

export const defaultFont: string = getDefaultFont();