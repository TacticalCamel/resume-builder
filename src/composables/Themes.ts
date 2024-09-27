import { getDefaultLightTheme, getDefaultDarkTheme } from "@/composables/CssUtils";
import { Theme } from "@/models/style/Theme";
import { Color } from "@/models/style/Color";

const defaultLightTheme: Theme = getDefaultLightTheme();
const defaultDarkTheme: Theme = getDefaultDarkTheme();

export function useThemes() {
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

    function findThemeById(id: string, themes: Theme[]): Theme | undefined {
        if(defaultLightTheme.id === id){
            return defaultLightTheme;
        }

        if(defaultDarkTheme.id === id){
            return defaultDarkTheme;
        }

        return themes.find(theme => theme.id === id);
    }

    return {
        defaultLightTheme,
        defaultDarkTheme,
        applyTheme,
        isDarkContrast,
        findThemeById
    };
}