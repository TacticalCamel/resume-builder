import { cssColorKeys, getVariables } from "@/functions/Css";
import { Theme } from "@/models/style/Theme";
import { Color } from "@/models/style/Color";
import { RGB } from "@/models/style/RGB";

/**
 * Pre-created light and dark theme.
 */
export const defaultThemes = {
    light: createDefaultLightTheme(),
    dark: createDefaultDarkTheme()
}

/**
 * Find the inherited value of a color.
 * @param color The color to check.
 * @param theme The current theme.
 * @param themes The list of themes to search.
 */
function findBaseColorValue(color: Color, theme: Theme, themes: Theme[]): RGB | undefined {
    // no value when there is no base theme
    if(!theme.base) {
        return undefined;
    }

    // find the base theme in the provided list by id
    const baseTheme: Theme | undefined = findThemeById(theme.base, themes);

    // find the color by name
    return baseTheme?.colors.find(c => c.name === color.name)?.value;
}

/**
 * Get the default color palette from CSS.
 */
function getColorsFromCss(): Color[] {
    // get all variable in the root selector and assume they're all colors
    const variables: Record<string, string> = getVariables(':root');

    // map key-value pairs to colors
    return Object.keys(variables).map((key: string): Color => {
        const rgb: RGB = parseRgbString(variables[key]);

        return {
            name: key,
            value: rgb
        };
    });
}

/**
 * Parse a space separated RGB color string into numbers.
 * @param value The string to parse.
 */
function parseRgbString(value: string): RGB {
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
    const colors: Color[] = getColorsFromCss();

    return {
        id: 'default-light',
        name: 'Light',
        base: undefined,
        colors: colors
    };
}

/**
 * Create a theme from the initial CSS color values, then swap the background and foreground colors.
 */
function createDefaultDarkTheme(): Theme {
    const colors: Color[] = getColorsFromCss();

    const foregroundColor: Color | undefined = colors.find(color => color.name === cssColorKeys.foreground);
    const backgroundColor: Color | undefined = colors.find(color => color.name === cssColorKeys.background);

    // swap the background and foreground color
    if (foregroundColor && backgroundColor) {
        [foregroundColor.value, backgroundColor.value] = [backgroundColor.value, foregroundColor.value];
    }

    return {
        id: 'default-dark',
        name: 'Dark',
        base: undefined,
        colors: colors
    };
}

/**
 * Find a theme by id in a list of themes.
 * @param id The id to find.
 * @param themes The list of themes to search.
 */
export function findThemeById(id: string, themes: Theme[]): Theme {
    // find in the list
    const theme: Theme | undefined = themes.find(theme => theme.id === id);

    // if found, return the result
    if(theme) {
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
    theme.colors.forEach((color: Color): void => {
        element.style.setProperty(color.name, `${color.value.r} ${color.value.g} ${color.value.b}`)
    });
}

/**
 * Check if a color achieves better contrast with black than white.
 * @param value The color value to check.
 * @returns True if the color with better contrast is black, false if it's white.
 */
export function isDarkContrast(value: RGB): boolean {
    return value.r * 0.299 + value.g * 0.587 + value.b * 0.114 > 150;
}

/**
 * Check if a color value differs from the corresponding value in its base theme.
 * This information can be used to signal that the color can be reset.
 * @param color The color to check.
 * @param theme The current theme.
 * @param themes The list of themes to search.
 */
export function isColorModified(color: Color, theme: Theme, themes: Theme[]): boolean {
    const defaultValue: RGB | undefined = findBaseColorValue(color, theme, themes);

    // the value is not considered modified when there is no default value
    return defaultValue !== undefined && defaultValue !== color.value;
}

/**
 * Change a color back to its default value.
 * @param color The color to reset.
 * @param theme The current theme.
 * @param themes The list of themes to search.
 */
export function resetColor(color: Color, theme: Theme, themes: Theme[]): void {
    const defaultValue: RGB | undefined = findBaseColorValue(color, theme, themes);

    // only reset if there is a default value
    if (defaultValue) {
        color.value = defaultValue;
    }
}