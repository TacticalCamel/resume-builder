import INavigationService from "@/services/interfaces/INavigationService";
import NavigationService from "@/services/implementations/NavigationService";
import IThemeService from "@/services/interfaces/IThemeService";
import ThemeService from "@/services/implementations/ThemeService";
import IFontService from "@/services/interfaces/IFontService";
import FontService from "@/services/implementations/FontService";
import DefaultThemes from "@/services/implementations/DefaultThemes";
import LocalStorageAutosaveService from "@/services/implementations/LocalStorageAutosaveService";
import Color from "@/models/Color";
import Theme from "@/models/Theme";
import Font from "@/models/Font";

// project-specific variables and functions to configure services
class CssUtils {
    static readonly VARIABLE_PREFIX = '--';
    static readonly ROOT_SELECTOR = ':root';
    static readonly HTML_SELECTOR = 'html';
    static readonly FOREGROUND_COLOR_NAME = '--foreground';
    static readonly BACKGROUND_COLOR_NAME = '--background';
    static readonly FONT_VARIABLE_NAME = '--font-family';

    // Check all stylesheets for a variable inside a selector and return its value.
    static getVariable(selectorText: string, variableName: string): string | undefined {
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

                // skip rules that are not in the specified selector
                if (rule.selectorText !== selectorText) {
                    continue;
                }

                // iterate over all the properties
                for (let k = 0; k < rule.style.length; k++) {
                    // get the current property name
                    const name: string = rule.style[k];

                    // if the property name is the specified variable name,
                    // return the property value
                    if (name === variableName) {
                        return rule.style.getPropertyValue(name);
                    }
                }
            }
        }

        return undefined;
    }

    // Check all stylesheets for a selector and return all variables inside it.
    static getVariables(selectorText: string): Record<string, string> {
        // create a map to store the results
        const results: Record<string, string> = {};

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

                // skip rules that are not in the specified selector
                if (rule.selectorText !== selectorText) {
                    continue;
                }

                // iterate over all the properties
                for (let k = 0; k < rule.style.length; k++) {
                    // get the current property name
                    const name: string = rule.style[k];

                    // skip properties that are not variables
                    if (!name.startsWith(CssUtils.VARIABLE_PREFIX)) {
                        continue;
                    }

                    // get the property value
                    results[name] = rule.style.getPropertyValue(name);
                }
            }
        }

        return results;
    }

    // Get all colors defined in the root selector.
    static getColors(): Color[] {
        // get all variable in the root selector and assume they're all colors
        const variables: Record<string, string> = CssUtils.getVariables(CssUtils.ROOT_SELECTOR);

        // map key-value pairs to colors
        return Object.keys(variables).map(key => new Color(key, variables[key]));
    }

    // Create a theme from the initial CSS values.
    static getDefaultLightTheme(): Theme {
        return new Theme('default-light', 'Light', undefined, CssUtils.getColors());
    }

    // Create a theme from the initial CSS values but swap the background and foreground colors.
    static getDefaultDarkTheme(): Theme {
        const colors: Color[] = CssUtils.getColors();

        const foregroundColor: Color | undefined = colors.find(color => color.name === CssUtils.FOREGROUND_COLOR_NAME);
        const backgroundColor: Color | undefined = colors.find(color => color.name === CssUtils.BACKGROUND_COLOR_NAME);

        if (foregroundColor && backgroundColor) {
            const temp: string = foregroundColor.value;

            foregroundColor.value = backgroundColor.value;
            backgroundColor.value = temp;
        }

        return new Theme('default-dark', 'Dark', undefined, colors);
    }

    // Get the initial font value from CSS.
    static getDefaultFont(): string {
        const value: string | undefined = CssUtils.getVariable(CssUtils.HTML_SELECTOR, CssUtils.FONT_VARIABLE_NAME);

        if (!value) {
            return 'sans-serif';
        }

        return value.replace(/"/g, '');
    }
}

/*
export const db = await openDB<DatabaseSchema>('resume-builder-db', 1, {
    upgrade(db: IDBPDatabase<DatabaseSchema>): void {
        db.createObjectStore('customThemes');
        db.createObjectStore('customFonts')
        db.createObjectStore('systemFonts');
        db.createObjectStore('templates');
    }
});

await db.getAll('customFonts')*/

const defaultThemes = new DefaultThemes(CssUtils.getDefaultLightTheme(), CssUtils.getDefaultDarkTheme());
const customThemesStore = new LocalStorageAutosaveService<Theme[]>('custom-themes', () => [], Theme.serializer)
const currentThemeStore = new LocalStorageAutosaveService<string>('current-theme', () => defaultThemes.light.id);

const defaultFont = CssUtils.getDefaultFont();
const systemFontsStore = new LocalStorageAutosaveService<Font[]>('system-fonts', () => []);
const customFontsStore = new LocalStorageAutosaveService<Font[]>('custom-fonts', () => [{name: defaultFont, data: undefined}]);
const currentFontStore = new LocalStorageAutosaveService<string>('current-font', () => defaultFont);

// initialize singleton services
export const navigationService: INavigationService = new NavigationService();
export const themeService: IThemeService<DefaultThemes> = new ThemeService(defaultThemes, customThemesStore, currentThemeStore);
export const fontService: IFontService = new FontService(systemFontsStore, customFontsStore, currentFontStore);