import IThemeService from "@/services/interfaces/IThemeService";
import DefaultThemes from "@/models/style/DefaultThemes";
import Theme from "@/models/style/Theme";
import Color from "@/models/style/Color";
import LocalStorageAutosaveService from "@/services/implementations/LocalStorageAutosaveService";

export default class ThemeService implements IThemeService<DefaultThemes> {
    private readonly _defaultThemes: DefaultThemes
    private readonly customThemesStore: LocalStorageAutosaveService<Theme[]>;
    private readonly currentThemeStore: LocalStorageAutosaveService<string>;

    constructor(defaultThemes: DefaultThemes, customThemesStore: LocalStorageAutosaveService<Theme[]>, currentThemeStore: LocalStorageAutosaveService<string>) {
        this._defaultThemes = defaultThemes;
        this.customThemesStore = customThemesStore;
        this.currentThemeStore = currentThemeStore;
    }

    get currentTheme(): Theme {
        const theme: Theme | undefined = this.customThemes.find(t => t.id === this.currentThemeStore.value);

        if (theme) {
            return theme;
        }

        return this.defaultThemes.dark.id === this.currentThemeStore.value ? this.defaultThemes.dark : this.defaultThemes.light;
    }

    get customThemes(): Theme[] {
        return this.customThemesStore.value;
    }

    get defaultThemes(): DefaultThemes {
        return this._defaultThemes;
    }

    get allThemes(): Theme[] {
        return [this.defaultThemes.light, this.defaultThemes.dark, ...this.customThemes];
    }

    set currentTheme(theme: Theme) {
        this.currentThemeStore.value = theme.id;
    }

    set customThemes(themes: Theme[]) {
        this.customThemesStore.value = themes;
    }

    createTheme(name: string, baseThemeId: string | undefined): Theme {
        const id: string = crypto.randomUUID();
        const colors: Color[] = (this.getBaseTheme(baseThemeId) ?? this.defaultThemes.light).colors.map(color => new Color(color.name, color.value));

        const theme: Theme = new Theme(id, name, baseThemeId, colors);

        this.customThemes.push(theme);

        return theme;
    }

    applyTheme(element: HTMLElement, theme: Theme): void {
        theme.colors.forEach(color => element.style.setProperty(color.name, color.value));
    }

    isColorModified(color: Color): boolean {
        // get the default color value
        const defaultValue: string | undefined = this.getDefaultColorValue(color);

        // if there is no default value, return false
        if (!defaultValue) {
            return false;
        }

        // compare the value to the default
        return this.getDefaultColorValue(color) !== color.value;
    }

    resetColor(color: Color): void {
        // get the default color value
        const defaultValue: string | undefined = this.getDefaultColorValue(color);

        // if there is a one, change it and apply the color
        if (defaultValue) {
            color.value = defaultValue;
        }
    }

    private getDefaultColorValue(color: Color): string | undefined {
        const id: string | undefined = this.currentTheme.base;

        let baseTheme: Theme | undefined = this.getBaseTheme(id);

        if (!baseTheme) {
            return undefined;
        }

        const baseColor: Color | undefined = baseTheme.colors.find(c => c.name === color.name);

        return baseColor?.value;
    }

    private getBaseTheme(id: string | undefined): Theme | undefined {
        if (id) {
            return this.allThemes.find(t => t.id === id);
        }
    }
}