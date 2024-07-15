import type Theme from "@/models/themes/Theme";
import type Color from "@/models/themes/Color";

// get all CSS variables from the root selector
function getRootCssRules(): Color[] {
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

export function createDefaultLightTheme(): Theme {
    return {
        id: 'default-light',
        name: 'Default light',
        colors: getRootCssRules()
    };
}

export function createDefaultDarkTheme(): Theme {
    const colors: Color[] = getRootCssRules();

    const primaryColor: Color | undefined = colors.find(c => c.name === '--primary');
    const backgroundColor: Color | undefined = colors.find(c => c.name === '--background');

    if(primaryColor && backgroundColor) {
        primaryColor.value = '246 249 252';
        backgroundColor.value = '23 26 33';
    }

    return {
        id: 'default-dark',
        name: 'Default dark',
        colors: colors
    };
}

export function createNewTheme(): Theme {
    return {
        id: crypto.randomUUID(),
        name: 'New theme',
        colors: []
    }
}

