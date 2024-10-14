import { getVariables } from "@/functions/Css";
import { Theme } from "@/models/style/Theme";
import { Color } from "@/models/style/Color";

const ROOT_SELECTOR: string = ':root';
const FOREGROUND_COLOR_NAME: string = '--foreground';
const BACKGROUND_COLOR_NAME: string = '--background';

// get all colors defined in the root selector
function getColors(): Color[] {
    // get all variable in the root selector and assume they're all colors
    const variables: Record<string, string> = getVariables(ROOT_SELECTOR);

    // map key-value pairs to colors
    return Object.keys(variables).map(key => ({name: key, value: variables[key]}));
}

// create a theme from the initial CSS values
function getDefaultLightTheme(): Theme {
    return {
        id: 'default-light',
        name: 'Light',
        base: undefined,
        colors: getColors()
    };
}

// create a theme from the initial CSS values then swap the background and foreground colors
function getDefaultDarkTheme(): Theme {
    const colors: Color[] = getColors();

    const foregroundColor: Color | undefined = colors.find(color => color.name === FOREGROUND_COLOR_NAME);
    const backgroundColor: Color | undefined = colors.find(color => color.name === BACKGROUND_COLOR_NAME);

    if (foregroundColor && backgroundColor) {
        const temp: string = foregroundColor.value;

        foregroundColor.value = backgroundColor.value;
        backgroundColor.value = temp;
    }

    return {
        id: 'default-dark',
        name: 'Dark',
        base: undefined,
        colors: colors
    };
}

export const defaultLightTheme: Theme = getDefaultLightTheme();

export const defaultDarkTheme: Theme = getDefaultDarkTheme();

export function getTheme(id: string, themes: Theme[]): Theme {
    const theme: Theme | undefined = themes.find(theme => theme.id === id);

    if(theme) {
        return theme;
    }

    return defaultDarkTheme.id === id ? defaultDarkTheme : defaultLightTheme;
}

export function applyTheme(element: HTMLElement, theme: Theme): void {
    theme.colors.forEach((color: Color): void => {
        element.style.setProperty(color.name, color.value)
    });
}

export function isDarkContrast(color: Color): boolean {
    const rgb: string[] = color.value.split(' ');

    const r: number = parseInt(rgb[0]);
    const g: number = parseInt(rgb[1]);
    const b: number = parseInt(rgb[2]);

    return r * 0.299 + g * 0.587 + b * 0.114 > 150;
}