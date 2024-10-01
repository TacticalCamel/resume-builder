import { Color } from "@/models/style/Color";
import { Theme } from "@/models/style/Theme";

const VARIABLE_PREFIX = '--';
const ROOT_SELECTOR = ':root';
const HTML_SELECTOR = 'html';
const FOREGROUND_COLOR_NAME = '--foreground';
const BACKGROUND_COLOR_NAME = '--background';
const FONT_VARIABLE_NAME = '--font-family';

const defaultLightTheme: Theme = getDefaultLightTheme();
const defaultDarkTheme: Theme = getDefaultDarkTheme();
const defaultFont: string = getDefaultFont();

export function useStyleSheet() {
    return {
        defaultLightTheme,
        defaultDarkTheme,
        defaultFont
    };
}

// check all stylesheets for a variable inside a selector and return its value
function getVariable(selectorText: string, variableName: string): string | undefined {
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

// check all stylesheets for a selector and return all variables inside it
function getVariables(selectorText: string): Record<string, string> {
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
                if (!name.startsWith(VARIABLE_PREFIX)) {
                    continue;
                }

                // get the property value
                results[name] = rule.style.getPropertyValue(name);
            }
        }
    }

    return results;
}

// get all colors defined in the root selector
function getColors(): Color[] {
    // get all variable in the root selector and assume they're all colors
    const variables: Record<string, string> = getVariables(ROOT_SELECTOR);

    // map key-value pairs to colors
    return Object.keys(variables).map(key => ({name: key, value: variables[key]}));
}

// create a theme from the initial CSS values
function getDefaultLightTheme(): Theme {
    return {
        id: 'default-light',
        name: 'Light',
        base: undefined,
        colors: getColors()
    };
}

// create a theme from the initial CSS values then swap the background and foreground colors
function getDefaultDarkTheme(): Theme {
    const colors: Color[] = getColors();

    const foregroundColor: Color | undefined = colors.find(color => color.name === FOREGROUND_COLOR_NAME);
    const backgroundColor: Color | undefined = colors.find(color => color.name === BACKGROUND_COLOR_NAME);

    if (foregroundColor && backgroundColor) {
        const temp: string = foregroundColor.value;

        foregroundColor.value = backgroundColor.value;
        backgroundColor.value = temp;
    }

    return {
        id: 'default-dark',
        name: 'Dark',
        base: undefined,
        colors: colors
    };
}

// get the initial font value from CSS
function getDefaultFont(): string {
    const value: string | undefined = getVariable(HTML_SELECTOR, FONT_VARIABLE_NAME);

    if (!value) {
        return 'sans-serif';
    }

    return value.replace(/"/g, '');
}

