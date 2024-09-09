import { computed, Ref, toRaw, watch } from "vue";
import { usePersistentRef } from "@/composables/PersistentRef";
import { ReactiveQuery, useReactiveQuery } from "@/composables/ReactiveQuery";
import { useDatabase } from "@/composables/Database";
import { EntityTable } from "dexie";
import DefaultThemes from "@/models/DefaultThemes";
import Theme from "@/models/style/Theme";
import Color from "@/models/style/Color";

import { CssUtils } from "@/css-utils";

let instance: IThemeService<DefaultThemes> | undefined;

export function useThemeService(): IThemeService<DefaultThemes> {
    if (instance) {
        return instance;
    }

    const defaultThemes: DefaultThemes = new DefaultThemes(
        CssUtils.getDefaultLightTheme(),
        CssUtils.getDefaultDarkTheme()
    );

    instance = new ThemeService(
        defaultThemes,
        useDatabase().themes,
        usePersistentRef<string>('current-theme', () => defaultThemes.light.id)
    );

    return instance;
}

export interface IThemeService<TDefaultThemes extends Record<string, Theme>> {
    get currentTheme(): Theme
    set currentTheme(theme: Theme)

    get customThemes(): Theme[]
    set customThemes(themes: Theme[])

    get defaultThemes(): TDefaultThemes

    get allThemes(): Theme[]

    createTheme(name: string, baseThemeId: string | undefined): Promise<Theme>
    applyTheme(element: HTMLElement, theme: Theme): void
    isColorModified(color: Color): boolean
    resetColor(color: Color): void
}

class ThemeService implements IThemeService<DefaultThemes> {
    private readonly _defaultThemes: DefaultThemes
    private readonly _themes: EntityTable<Theme, 'id'>
    private readonly _currentTheme: Ref<string>

    private readonly _customThemes: ReactiveQuery<Theme[]>


    constructor(defaultThemes: DefaultThemes, themes: EntityTable<Theme, 'id'>, currentTheme: Ref<string>) {
        this._defaultThemes = defaultThemes;
        this._themes = themes;
        this._currentTheme = currentTheme;

        this._customThemes = useReactiveQuery(() => this._themes.toArray());

        watch(computed(() => this.currentTheme), (value: Theme) => {
            if(value.id === this.defaultThemes.light.id || value.id === this.defaultThemes.dark.id) {
                return;
            }

            this._themes.put(toRaw<Theme>(value));
        }, {deep: true});
    }

    get currentTheme(): Theme {
        const theme: Theme | undefined = this.customThemes.find(t => t.id === this._currentTheme.value);

        if (theme) {
            return theme;
        }

        return this.defaultThemes.dark.id === this._currentTheme.value ? this.defaultThemes.dark : this.defaultThemes.light;
    }

    set currentTheme(theme: Theme) {
        this._currentTheme.value = theme.id;
    }

    get customThemes(): Theme[] {
        return this._customThemes.value ?? [];
    }

    get defaultThemes(): DefaultThemes {
        return this._defaultThemes;
    }

    get allThemes(): Theme[] {
        return [this.defaultThemes.light, this.defaultThemes.dark, ...this.customThemes];
    }

    async createTheme(name: string, baseThemeId: string | undefined): Promise<Theme> {
        const id: string = crypto.randomUUID();
        const colors: Color[] = (this.getBaseTheme(baseThemeId) ?? this.defaultThemes.light).colors.map(color => ({name: color.name, value: color.value}));

        const theme: Theme = {
            id: id,
            name: name,
            base: baseThemeId,
            colors: colors
        };

        await this._themes.add(theme);

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