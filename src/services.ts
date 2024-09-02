import INavigationService from "@/services/interfaces/INavigationService";
import NavigationService from "@/services/implementations/NavigationService";
import IThemeService from "@/services/interfaces/IThemeService";
import ThemeService from "@/services/implementations/ThemeService";
import IFontService from "@/services/interfaces/IFontService";
import FontService from "@/services/implementations/FontService";
import LocalStorageAutosaveService from "@/services/implementations/LocalStorageAutosaveService";
import DefaultThemes from "@/models/style/DefaultThemes";
import Color from "@/models/style/Color";
import Theme from "@/models/style/Theme";
import { DBSchema, IDBPDatabase, openDB } from "idb";
import AsyncObjectStore from "@/services/implementations/AsyncObjectStore";
import Font from "@/models/style/Font";
import { ResumeModel } from "@/models/resume/Resume";

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

// project-specific variables and functions to configure the client side database
export default interface DatabaseSchema extends DBSchema {
    customThemes: {
        key: string
        value: Theme
    }
    customFonts: {
        key: string
        value: Font
    }
    systemFonts: {
        key: string
        value: Font
    }
    templates: {
        key: string
        value: ResumeModel
    }
}

const defaultThemes: DefaultThemes = new DefaultThemes(CssUtils.getDefaultLightTheme(), CssUtils.getDefaultDarkTheme());
const defaultFont: string = CssUtils.getDefaultFont();

const db = await openDB<DatabaseSchema>('resume-builder-db', 1, {
    upgrade(db: IDBPDatabase<DatabaseSchema>): void {
        db.createObjectStore('customThemes', {
            keyPath: 'id'
        });

        const customFonts = db.createObjectStore('customFonts', {
            keyPath: 'name'
        })

        customFonts.add({
            name: defaultFont,
            data: undefined
        });

        db.createObjectStore('systemFonts', {
            keyPath: 'name'
        });

        db.createObjectStore('templates', {
            autoIncrement: true
        });
    }
});

export const navigationService: INavigationService = new NavigationService();

export const themeService: IThemeService<DefaultThemes> = new ThemeService(
    defaultThemes,
    new LocalStorageAutosaveService<Theme[]>('custom-themes', () => [], Theme.serializer),
    new LocalStorageAutosaveService<string>('current-theme', () => defaultThemes.light.id)
);

export const fontService: IFontService = new FontService(
    new AsyncObjectStore(db, 'systemFonts'),
    new AsyncObjectStore(db, 'customFonts'),
    new LocalStorageAutosaveService<string>('current-font', () => defaultFont)
);