import { useStyleSheet } from "@/composables/StyleSheet";
import { Theme } from "@/models/style/Theme";
import { Color } from "@/models/style/Color";

export function useThemes() {
    const {defaultLightTheme, defaultDarkTheme} = useStyleSheet();

    function getTheme(id: string, themes: Theme[]): Theme {
        const theme: Theme | undefined = themes.find(theme => theme.id === id);

        if(theme) {
            return theme;
        }

        return defaultDarkTheme.id === id ? defaultDarkTheme : defaultLightTheme;
    }

    function applyTheme(element: HTMLElement, theme: Theme): void {
        theme.colors.forEach((color: Color): void => {
            element.style.setProperty(color.name, color.value)
        });
    }

    function isDarkContrast(color: Color): boolean {
        const rgb: string[] = color.value.split(' ');

        const r: number = parseInt(rgb[0]);
        const g: number = parseInt(rgb[1]);
        const b: number = parseInt(rgb[2]);

        return r * 0.299 + g * 0.587 + b * 0.114 > 150;
    }

    return {
        defaultLightTheme,
        defaultDarkTheme,
        applyTheme,
        isDarkContrast,
        getTheme
    };
}