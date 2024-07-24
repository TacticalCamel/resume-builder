import Theme from "@/models/Theme";
import Color from "@/models/Color";
import AutosaveService from "@/services/AutosaveService";

export default class ThemeService {
    // only store a list of themes and the current theme id
    private readonly themesStorage: AutosaveService<Theme[]>;
    private readonly currentThemeIdStorage: AutosaveService<string>;

    // create default themes from CSS
    readonly defaultLightTheme: Theme;
    readonly defaultDarkTheme: Theme

    constructor() {
        this.themesStorage = new AutosaveService<Theme[]>('themes', () => [], {deep: true});
        this.currentThemeIdStorage = new AutosaveService<string>('current-theme', () => 'default-light');
        this.defaultLightTheme = createDefaultLightTheme();
        this.defaultDarkTheme = createDefaultDarkTheme();

        this.applyTheme(this.currentTheme);
    }

    // expose theme list
    get themes(): Theme[] {
        return this.themesStorage.value;
    }

    set themes(value: Theme[]) {
        this.themesStorage.value = value;
    }

    // expose current theme
    get currentTheme(): Theme {
        const theme: Theme | undefined = this.themes.find(t => t.id === this.currentThemeIdStorage.value);

        if (theme) {
            return theme;
        }

        return this.defaultDarkTheme.id === this.currentThemeIdStorage.value ? this.defaultDarkTheme : this.defaultLightTheme;
    }

    set currentTheme(theme: Theme) {
        this.currentThemeIdStorage.value = theme.id;

        this.applyTheme(theme);
    }

    // is the current theme one of the default themes
    get defaultThemeSelected(): boolean {
        // get the current theme
        const theme: Theme = this.currentTheme;

        // check if the theme is one of the default themes
        return theme.id === this.defaultLightTheme.id || theme.id === this.defaultDarkTheme.id;
    }

    // determine if a color value differs from the default value
    isColorModified(color: Color): boolean {
        // get the current theme
        const theme: Theme = this.currentTheme;

        // get the default theme
        const defaultTheme: Theme = theme.isDark ? this.defaultDarkTheme : this.defaultLightTheme;

        // find the default color value
        const defaultValue: string | undefined = defaultTheme.colors.find(c => c.name === color.name)?.value;

        // compare the values
        return defaultValue !== color.value;
    }

    // reset a single color to its default value
    resetColor(color: Color): void {
        // get the current theme
        const theme: Theme = this.currentTheme;

        // get the default theme
        const defaultTheme: Theme = theme.isDark ? this.defaultDarkTheme : this.defaultLightTheme;

        // find the default color value
        const defaultValue: string | undefined = defaultTheme.colors.find(c => c.name === color.name)?.value;

        // if there is a one, change it and apply the color
        if (defaultValue) {
            color.value = defaultValue;

            this.applyColor(color);
        }
    }

    // apply a color to the document
    applyColor(color: Color): void {
        document.documentElement.style.setProperty(color.name, color.value);
    }

    // apply a theme to the document
    applyTheme(theme: Theme): void {
        theme.colors.forEach(color => {
            this.applyColor(color);
        });
    }
}

function getCssVariables(selector: string): Color[] {
    // the prefix of the root rules to consider
    const variablePrefix = '--';

    // create a map to store the results
    const results: Color[] = [];

    // iterate over all the style sheets
    for (let i = 0; i < document.styleSheets.length; i++) {
        // get the current style sheet
        const sheet: CSSStyleSheet = document.styleSheets[i];

        // skip external style sheets
        if (sheet.href != null && !sheet.href.startsWith(window.location.origin)) {
            continue;
        }

        for (let j = 0; j < sheet.cssRules.length; j++) {
            // get the current rule
            const rule: CSSRule = sheet.cssRules[j];

            // skip non-style rules
            if (!(rule instanceof CSSStyleRule)) {
                continue;
            }

            // skip rules that are not the root selector
            if (rule.selectorText !== selector) {
                continue;
            }

            // iterate over all the properties
            for (let k = 0; k < rule.style.length; k++) {
                // get the current property name
                const name: string = rule.style[k];

                // skip properties that do not start with the prefix
                if (!name.startsWith(variablePrefix)) {
                    continue;
                }

                // get the property value
                const value: string = rule.style.getPropertyValue(name);

                // store the property name and value
                results.push({
                    name: name,
                    value: value
                });
            }
        }
    }

    return results;
}

export function createDefaultLightTheme(): Theme {
    return {
        id: 'default-light',
        name: 'Light',
        isDark: false,
        colors: getCssVariables(':root')
    };
}

export function createDefaultDarkTheme(): Theme {
    const colors: Color[] = getCssVariables(':root');

    const primaryColor: Color | undefined = colors.find(c => c.name === '--primary');
    const backgroundColor: Color | undefined = colors.find(c => c.name === '--background');

    if (primaryColor && backgroundColor) {
        primaryColor.value = '246 249 252';
        backgroundColor.value = '23 26 33';
    }

    return {
        id: 'default-dark',
        name: 'Dark',
        isDark: true,
        colors: colors
    };
}