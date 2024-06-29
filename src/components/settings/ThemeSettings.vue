<script setup lang="ts">
    import {computed} from "vue";
    import type Color from "@/models/themes/Color";
    import type Theme from "@/models/themes/Theme";
    import type SettingsModel from "@/models/SettingsModel";

    const settings = defineModel<SettingsModel>('settings', {
        required: true
    });

    // create a default theme from CSS
    const defaultTheme: Theme = {
        name: "Default",
        colors: getRootCssRules()
    };

    // computed property for the current theme
    const currentTheme = computed(() => settings.value.themes.find(theme => theme.name === settings.value.currentTheme));

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

    // set the color of a CSS variable
    function onColorChange(colorName: string, event: Event): void {
        const theme: Theme | undefined = currentTheme.value;

        // if there is no current theme, return
        if (!theme) {
            return;
        }

        // get the input element
        const input = event.target as HTMLInputElement;

        // convert the color to an RGB string
        const rgb = hex2rgb(input.value);

        // find the color in the theme
        const color: Color | undefined = theme.colors.find(c => c.name === colorName);

        // update the color in the theme
        if (color) {
            color.value = rgb;
        }
        else {
            theme.colors.push({
                name: colorName,
                value: rgb
            });
        }

        // update the color in CSS
        applyStyle(colorName, rgb);
    }

    // change the current theme
    function onThemeChange(event: Event): void {
        const select = event.target as HTMLSelectElement;

        const index = select.selectedIndex - 1;

        if (index < 0) {
            settings.value.currentTheme = undefined;
            applyTheme(defaultTheme);
        }
        else {
            const selectedTheme = settings.value.themes[index];

            settings.value.currentTheme = selectedTheme.name;
            applyTheme(selectedTheme);
        }
    }

    // update a CSS variable
    function applyStyle(key: string, value: string): void {
        document.documentElement.style.setProperty(key, value);
    }

    // update all the colors in the current theme
    function applyTheme(theme: Theme): void {
        defaultTheme.colors.forEach(color => {
            const themeColor: Color | undefined = theme.colors.find(c => c.name === color.name);

            if(themeColor) {
                applyStyle(color.name, themeColor.value);
            }
            else{
                applyStyle(color.name, color.value);
            }
        });
    }

    // reset a single color to its default value
    function resetColor(colorName: string): void {
        const theme: Theme | undefined = currentTheme.value;

        // if there is no current theme, return
        if (!theme) {
            return;
        }

        // remove the color from the theme
        theme.colors = theme.colors.filter(c => c.name !== colorName);

        // find the default value
        const defaultValue: string | undefined = defaultTheme.colors.find(c => c.name === colorName)?.value;

        // if there is a default value, apply it
        if (defaultValue) {
            applyStyle(colorName, defaultValue);
        }
    }

    // convert an RGB string to a hex string
    function rgb2hex(rgb: string): string{
        const rgbArr = rgb.split(' ');
        const r = parseInt(rgbArr[0]);
        const g = parseInt(rgbArr[1]);
        const b = parseInt(rgbArr[2]);

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    // convert a hex string to an RGB string
    function hex2rgb(hex: string): string{
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);

        return `${r} ${g} ${b}`;
    }
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="pb-1 border-b border-gray-500 text-xl">Themes</div>

        <div class="flex">
            <div>Current theme</div>
            <select v-model="settings.currentTheme" class="ms-auto bg-background outline-0 ring-1 ring-accent rounded px-2" @change="onThemeChange">
                <option :value="undefined">{{ defaultTheme.name }}</option>
                <option v-for="theme in settings.themes" :key="theme.name" :value="theme.name">{{ theme.name }}</option>
            </select>
        </div>

        <table v-if="currentTheme">
            <tr class="col-span-2 text-sm font-mono" v-for="color in defaultTheme.colors" :key="color.name">
                <td class="pe-4">{{ color.name }}</td>
                <td class="flex items-center">
                    <input type="color" :value="rgb2hex(currentTheme.colors.find(c => c.name === color.name)?.value ?? color.value)" @change="(e) => onColorChange(color.name, e)" class="bg-transparent me-1">
                    <span>{{ rgb2hex(currentTheme.colors.find(c => c.name === color.name)?.value ?? color.value) }}</span>

                    <button v-if="currentTheme.colors.find(c => c.name === color.name)?.value" class="text-red-500 ms-3 hover:bg-red-500 hover:bg-opacity-20 rounded px-1 hover:transition-colors" @click="() => resetColor(color.name)">Reset</button>
                    <span v-else class="ms-3 px-1 italic opacity-60">Default</span>
                </td>
            </tr>
        </table>
        <div v-else class="italic col-span-2 opacity-60">
            Select or create a theme to customize it.
        </div>
    </div>
</template>