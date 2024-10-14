// check all stylesheets for a variable inside a selector and return its value
export function getVariable(selectorText: string, variableName: string): string | undefined {
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
export function getVariables(selectorText: string): Record<string, string> {
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
                if (!name.startsWith('--')) {
                    continue;
                }

                // get the property value
                results[name] = rule.style.getPropertyValue(name);
            }
        }
    }

    return results;
}