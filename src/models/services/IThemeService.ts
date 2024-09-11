import { Theme } from "@/models/style/Theme";
import { Color } from "@/models/style/Color";

export interface IThemeService<TDefaultThemes extends Record<string, Theme>> {
    get currentTheme(): Theme
    set currentTheme(theme: Theme)

    get customThemes(): Theme[]

    get defaultThemes(): TDefaultThemes

    get allThemes(): Theme[]

    createTheme(name: string, baseThemeId: string | undefined): Promise<Theme>
    applyTheme(element: HTMLElement, theme: Theme): void
    isColorModified(color: Color): boolean
    resetColor(color: Color): void
    isDarkContrast(color: Color): boolean
}