import Theme from "@/models/Theme";
import Color from "@/models/Color";

export default interface IThemeService<TDefaultThemes extends Record<string, Theme>> {
    get currentTheme(): Theme
    set currentTheme(theme: Theme)

    get customThemes(): Theme[]
    set customThemes(themes: Theme[])

    get defaultThemes(): TDefaultThemes

    get allThemes(): Theme[]

    createTheme(name: string, baseThemeId: string | undefined): Theme
    applyTheme(element: HTMLElement, theme: Theme): void
    isColorModified(color: Color): boolean
    resetColor(color: Color): void
}