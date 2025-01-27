import { getVariables } from "@/functions/CssUtils.ts";
import { Theme } from "@/models/Theme";
import { Color } from "@/models/Color";
import { ColorPalette } from "@/models/ColorPalette";

/**
 * Pre-created light and dark theme.
 */
export const defaultThemes = {
    light: createDefaultLightTheme(),
    dark: createDefaultDarkTheme()
}

export function isDefaultTheme(themeId: string): boolean {
    return themeId === defaultThemes.light.id || themeId === defaultThemes.dark.id;
}

/**
 * Find the inherited value of a color.
 * @param name The color to check.
 * @param theme The current theme.
 * @param themes The list of themes to search.
 */
function findBaseColorValue(name: keyof ColorPalette, theme: Theme, themes: Theme[]): Color | undefined {
    // no value when there is no base theme
    if (!theme.base) {
        return undefined;
    }

    // find the base theme in the provided list by id
    const baseTheme: Theme | undefined = findThemeById(theme.base, themes);

    // find the color by name
    return baseTheme?.colors[name];
}

/**
 * Get the default color palette from CSS.
 */
function getPaletteFromCss(): ColorPalette {
    // get all variable in the root selector and assume they're all colors
    const variables: Record<string, string> = getVariables(':root');

    const palette: ColorPalette = {} as ColorPalette;

    // map key-value pairs to colors
    Object.entries(variables).forEach(([key, value]) => {
        palette[key] = parseRgbString(value);
    });

    return palette;
}

/**
 * Parse a space separated RGB color string into numbers.
 * @param value The string to parse.
 */
function parseRgbString(value: string): Color {
    try {
        // split by spaces
        const colors: string[] = value.split(' ');

        return {
            r: parseInt(colors[0], 10),
            g: parseInt(colors[1], 10),
            b: parseInt(colors[2], 10)
        }
    }
    catch {
        // fallback to black in case the input was not the right format
        return {
            r: 0,
            g: 0,
            b: 0
        };
    }
}

/**
 * Create a theme from the initial CSS color values.
 */
function createDefaultLightTheme(): Theme {
    const palette: ColorPalette = getPaletteFromCss();

    return {
        id: 'default-light',
        name: 'Light',
        base: undefined,
        colors: palette
    };
}

/**
 * Create a theme from the initial CSS color values, then swap the background and foreground colors.
 */
function createDefaultDarkTheme(): Theme {
    const palette: ColorPalette = getPaletteFromCss();

    // swap the background and foreground color
    [palette.background, palette.foreground] = [palette.foreground, palette.background];

    return {
        id: 'default-dark',
        name: 'Dark',
        base: undefined,
        colors: palette
    };
}

/**
 * Find a theme by id in a list of themes.
 * @param id The id to find.
 * @param themes The list of themes to search.
 */
export function findThemeById(id: string | undefined, themes: Theme[]): Theme {
    // find in the list
    const theme: Theme | undefined = themes.find(theme => theme.id === id);

    // if found, return the result
    if (theme) {
        return theme;
    }

    // also check in the default themes
    // fallback to the default light theme even if the id is not found
    return defaultThemes.dark.id === id ? defaultThemes.dark : defaultThemes.light;
}

/**
 * Apply a theme to an HTML element.
 * @param element The element.
 * @param theme The theme to apply.
 */
export function applyTheme(element: HTMLElement, theme: Theme): void {
    Object.entries(theme.colors).forEach(([name, color]): void => {
        element.style.setProperty(`--${name}`, `${color.r} ${color.g} ${color.b}`)
    });
}

/**
 * Check if a color achieves better contrast with black than white.
 * @param value The color value to check.
 * @returns True if the color with better contrast is black, false if it's white.
 */
export function isDarkContrast(value: Color): boolean {
    return value.r * 0.299 + value.g * 0.587 + value.b * 0.114 > 150;
}

/**
 * Check if a color value differs from the corresponding value in its base theme.
 * This information can be used to signal that the color can be reset.
 * @param name The color to check.
 * @param theme The current theme.
 * @param themes The list of themes to search.
 */
export function isColorModified(name: keyof ColorPalette, theme: Theme, themes: Theme[]): boolean {
    const defaultValue: Color | undefined = findBaseColorValue(name, theme, themes);

    // the value is not considered modified when there is no default value
    return defaultValue !== undefined && defaultValue !== theme.colors[name];
}

/**
 * Change a color back to its default value.
 * @param name The color to reset.
 * @param theme The current theme.
 * @param themes The list of themes to search.
 */
export function resetColor(name: keyof ColorPalette, theme: Theme, themes: Theme[]): void {
    const defaultColor: Color | undefined = findBaseColorValue(name, theme, themes);

    // only reset if there is a default value
    if (defaultColor) {
        theme.colors[name] = defaultColor;
    }
}