import Theme from "@/models/themes/Theme";
import Color from "@/models/themes/Color";
import AutosaveService from "@/services/AutosaveService";
import { themeService } from "@/main";

export default class ThemeService {
    private readonly themesStorage: AutosaveService<Theme[]>;
    private readonly currentThemeIdStorage: AutosaveService<string>;
    readonly defaultThemes: Theme[];

    constructor() {
        this.themesStorage = new AutosaveService<Theme[]>('themes', () => [], {deep: true});
        this.currentThemeIdStorage = new AutosaveService<string>('current-theme', () => 'default-light');
        this.defaultThemes = [
            this.createDefaultLightTheme(),
            this.createDefaultDarkTheme()
        ];

        this.applyTheme(this.currentTheme);
    }

    setCurrentTheme(theme: Theme): void {
        this.currentThemeIdStorage.value = theme.id;

        this.applyTheme(theme);
    }

    get themes(): Theme[] {
        return this.themesStorage.value;
    }

    set themes(value: Theme[]) {
        this.themesStorage.value = value;
    }

    setColor(key: string, value: string): void {
        const theme: Theme = this.currentTheme;

        // find the color in the theme
        const color: Color | undefined = theme.colors.find(c => c.name === key);

        // update the color in the theme
        if (color) {
            color.value = value;
        }
        else {
            theme.colors.push({
                name: key,
                value: value
            });
        }

        // update the color in CSS
        this.applyColor(key, value);
    }

    // reset a single color to its default value
    resetColor(colorName: string): void {
        const theme: Theme = this.currentTheme;

        // remove the color from the theme
        theme.colors = theme.colors.filter(c => c.name !== colorName);

        // find the default value
        const defaultValue: string | undefined = this.defaultThemes[0].colors.find(c => c.name === colorName)?.value;

        // if there is a default value, apply it
        if (defaultValue) {
            this.applyColor(colorName, defaultValue);
        }
    }

    getColor(color: Color): string {
        return themeService.currentTheme.colors.find(c => c.name === color.name)?.value ?? color.value;
    }

    isColorModified(color: Color): boolean {
        return themeService.currentTheme.colors.find(c => c.name === color.name) !== undefined;
    }

    applyColor(key: string, value: string): void {
        document.documentElement.style.setProperty(key, value);
    }

    applyTheme(theme: Theme): void {
        this.defaultThemes[0].colors.forEach(color => {
            const themeColor: Color | undefined = theme.colors.find(c => c.name === color.name);

            if (themeColor) {
                this.applyColor(color.name, themeColor.value);
            }
            else {
                this.applyColor(color.name, color.value);
            }
        });
    }

    get currentTheme(): Theme {
        let theme: Theme | undefined = this.themes.find(t => t.id === this.currentThemeIdStorage.value);

        if(theme) {
            return theme;
        }

        return this.defaultThemes.find(t => t.id === this.currentThemeIdStorage.value) || this.defaultThemes[0];
    }

    get isDefaultTheme(): boolean {
        return this.defaultThemes.some(t => t.id === this.currentTheme.id);
    }

    getRootCssRules(): Color[] {
        // the name of the root selector
        const rootSelector = ":root";

        // the prefix of the root rules to consider
        const rulePrefix = "--";

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
                if (rule.selectorText !== rootSelector) {
                    continue;
                }

                // iterate over all the properties
                for (let k = 0; k < rule.style.length; k++) {
                    // get the current property name
                    const name: string = rule.style[k];

                    // skip properties that do not start with the prefix
                    if (!name.startsWith(rulePrefix)) {
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

    private createDefaultLightTheme(): Theme {
        return {
            id: 'default-light',
            name: 'Default light',
            colors: this.getRootCssRules()
        };
    }

    private createDefaultDarkTheme(): Theme {
        const colors: Color[] = this.getRootCssRules();

        const primaryColor: Color | undefined = colors.find(c => c.name === '--primary');
        const backgroundColor: Color | undefined = colors.find(c => c.name === '--background');

        if (primaryColor && backgroundColor) {
            primaryColor.value = '246 249 252';
            backgroundColor.value = '23 26 33';
        }

        return {
            id: 'default-dark',
            name: 'Default dark',
            colors: colors
        };
    }
}