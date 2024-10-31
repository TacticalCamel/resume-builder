import { getVariable } from "@/functions/Css";
import { Font } from "@/models/style/Font";

export const defaultFont: string = getDefaultFont();

/**
 * Get the initial font value from CSS.
 */
function getDefaultFont(): string {
    const value: string | undefined = getVariable('html', '--font-family');

    if (!value) {
        return 'sans-serif';
    }

    return value.replace(/"/g, '');
}

/**
 * Create a FontFace object from a font.
 * @param font
 */
function createFontFace(font: Font): FontFace | undefined {
    // font data is from other sources
    if (!font.data) {
        return undefined;
    }

    // create a font face
    return new FontFace(font.name, font.data);
}

/**
 * Retrieves all available system fonts.
 * TODO: Relies to the experimental feature 'queryLocalFonts', currently not supported by most browsers
 */
export async function getSystemFonts(): Promise<string[]> {
    if (!('queryLocalFonts' in window) || typeof window.queryLocalFonts !== 'function') {
        return [];
    }

    const localFonts: { family: string, fullName: string, postscriptName: string, style: string }[] = await window.queryLocalFonts();

    return localFonts
        .filter(font => font.style === 'Regular')
        .map(font => font.fullName);
}

/**
 * Adds a font to the current document.
 * @param font The font to add.
 */
export function loadFont(font: Font): void {
    // create a font face
    const fontFace: FontFace | undefined = createFontFace(font);

    // load the font if it's not already present
    if (fontFace && !document.fonts.has(fontFace)) {
        document.fonts.add(fontFace);
    }
}

/**
 * Removes a font from the current document.
 * @param font The font to remove.
 */
export function unloadFont(font: Font): void {
    const fontFace: FontFace | undefined = createFontFace(font);

    if(fontFace) {
        document.fonts.delete(fontFace);
    }
}