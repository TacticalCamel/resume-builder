<script setup lang="ts">
    import {computed, ref, watch} from "vue";
    import draggable from "vuedraggable";
    import type Color from "@/models/themes/Color";
    import type Theme from "@/models/themes/Theme";
    import type SettingsModel from "@/models/SettingsModel";
    import EditText from "@/components/shared/EditText.vue";
    import IconSwapVertical from "@/components/icons/settings/IconSwapVertical.vue";
    import ThemeCard from "@/components/shared/ThemeCard.vue";
    import {checkGroupMatch} from "@/models/BuildingBlock";

    const settings = defineModel<SettingsModel>('settings', {
        required: true
    });

    // create a default theme from CSS
    const defaultTheme: Theme = {
        name: "Default",
        colors: getRootCssRules()
    };

    // whether the theme select dropdown is open
    const themeSelectOpen = ref<boolean>(false);

    // computed property for the current theme
    const currentTheme = computed(() => settings.value.themes.find(theme => theme.name === settings.value.currentTheme));

    // watch for changes in the current theme
    watch(() => currentTheme.value, (theme) => {
        if (theme) {
            applyTheme(theme);
        }
        else {
            applyTheme(defaultTheme);
        }
    });

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

    // change the current theme
    function setTheme(theme: string | undefined): void {
        settings.value.currentTheme = theme;
        themeSelectOpen.value = false;
    }

    // update a theme in CSS
    function applyTheme(theme: Theme): void {
        defaultTheme.colors.forEach(color => {
            const themeColor: Color | undefined = theme.colors.find(c => c.name === color.name);

            if (themeColor) {
                applyColor(color.name, themeColor.value);
            }
            else {
                applyColor(color.name, color.value);
            }
        });
    }

    // rename a theme
    function renameTheme(name: string): void {
        settings.value.currentTheme = name;
    }

    // set the color of a CSS variable
    function setColor(colorName: string, event: Event): void {
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
        applyColor(colorName, rgb);
    }

    // update a color in CSS
    function applyColor(key: string, value: string): void {
        document.documentElement.style.setProperty(key, value);
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
            applyColor(colorName, defaultValue);
        }
    }

    // convert an RGB string to a hex string
    function rgb2hex(rgb: string): string {
        const rgbArr = rgb.split(' ');
        const r = parseInt(rgbArr[0]);
        const g = parseInt(rgbArr[1]);
        const b = parseInt(rgbArr[2]);

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    // convert a hex string to an RGB string
    function hex2rgb(hex: string): string {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);

        return `${r} ${g} ${b}`;
    }
</script>

<template>
    <div class="flex flex-col gap-4 min-w-80">
        <div class="pb-1 border-b border-primary border-opacity-40 text-xl">Theming</div>

        <div class="flex px-2">
            <div>Current font</div>
            <div class="ms-auto bg-accent rounded w-8 text-center bg-opacity-50">...</div>
        </div>

        <div class="flex gap-4 px-2">
            <div>Current theme</div>

            <div class="ms-auto">
                <edit-text v-if="currentTheme" v-model="currentTheme.name" @change="renameTheme"/>
                <div v-else class="text-primary text-opacity-70 italic">{{ defaultTheme.name }}</div>
            </div>

            <button @click="themeSelectOpen = !themeSelectOpen" class="bg-primary bg-opacity-0 hover:bg-opacity-20 rounded px-2 py-0.5 transition-colors">
                <icon-swap-vertical class="size-5"/>
            </button>
        </div>

        <transition name="slide-down" mode="out-in">
            <div v-if="themeSelectOpen">
                <transition-group>
                    <draggable
                        v-model="settings.themes"
                        item-key="id"
                        key="draggable"
                        drag-class="dragging"
                        ghost-class="ghost"
                        animation="200"
                        class="flex flex-col gap-1"
                        :group="{name: 'theme', pull: true, put: checkGroupMatch}"
                        :disabled="!settings.editable"
                    >
                        <template #header>
                            <theme-card @click="setTheme(undefined)" :theme="defaultTheme" :default-theme="defaultTheme" class="text-primary text-opacity-70 italic"/>
                        </template>

                        <template #item="{element: theme}: {element: Theme}">
                            <theme-card @click="setTheme(theme.name)" :theme="theme" :default-theme="defaultTheme"/>
                        </template>
                    </draggable>
                </transition-group>
            </div>
            <div v-else-if="currentTheme" class="outer-grid grid mx-2 text-sm gap-x-2 font-mono">
                <div v-for="color in defaultTheme.colors" :key="color.name" class="grid grid-cols-subgrid col-span-3">
                    <div class="flex items-center text-nowrap">
                        {{ color.name.substring(2) }}
                    </div>
                    <div class="flex items-center justify-center gap-1">
                        <input type="color" :value="rgb2hex(currentTheme.colors.find(c => c.name === color.name)?.value ?? color.value)" @change="(e) => setColor(color.name, e)" class="bg-transparent">
                        <span>{{ rgb2hex(currentTheme.colors.find(c => c.name === color.name)?.value ?? color.value) }}</span>
                    </div>
                    <div class="flex items-center justify-end">
                        <button v-if="currentTheme.colors.find(c => c.name === color.name)?.value" class="px-1 text-error hover:bg-error hover:bg-opacity-20 rounded hover:transition-colors font-semibold" @click="() => resetColor(color.name)">Reset</button>
                        <span v-else class="px-1 opacity-50">Reset</span>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="italic col-span-2 opacity-70 px-2">
                    Create or select a theme to customize it.
                </div>
            </div>
        </transition>
    </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .slide-down-enter-active, .slide-down-leave-active {
        transition: all 150ms ease-in-out;
    }

    .slide-down-enter-from, .slide-down-leave-to {
        opacity: 0;
        transform: translate(0, -1rem);
    }

    .outer-grid {
        grid-template-columns: min-content 1fr min-content;
    }
</style>