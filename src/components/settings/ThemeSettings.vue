<script setup lang="ts">
    import {onMounted, watch} from "vue";

    // model for the dark theme setting
    const darkTheme = defineModel('darkTheme', {
        type: Boolean,
        required: true
    })

    // model for the color settings
    const colors = defineModel('colors', {
        type: Map<string, string>,
        required: true
    })

    // get the default color values from CSS
    const defaultColors: Map<string, string> = getRootCssRules();

    // handle model loading from local storage
    onMounted(() => {
        // load the dark theme setting from local storage
        const darkThemeValue: string | null = localStorage.getItem('darkTheme');

        if (darkThemeValue != null) {
            darkTheme.value = darkThemeValue === 'true';
        }

        // get the default colors from the page
        const pageColors: Map<string, string> = new Map<string, string>(defaultColors);

        // load the color settings from local storage
        const overrideColors: string | null = localStorage.getItem('colors');

        // if there are colors to override, apply them
        if (overrideColors != null) {
            const overrideMap: Map<string, string> = new Map<string, string>(JSON.parse(overrideColors));

            for (const [key, value] of overrideMap) {
                if(!pageColors.has(key)) {
                    continue;
                }

                pageColors.set(key, value);
                document.documentElement.style.setProperty(key, value);
            }
        }

        // apply the color settings to the model
        colors.value = pageColors;
    });

    // watch for changes to the dark theme setting
    watch(darkTheme, (value) => {
        localStorage.setItem('darkTheme', value.toString());
    });

    // watch for changes to the color settings
    watch(colors, (value) => {
        localStorage.setItem('colors', JSON.stringify(Array.from(value.entries())));
    }, {deep: true});

    // get all CSS variables from the root selector
    function getRootCssRules(): Map<string, string> {
        // the name of the root selector
        const rootSelector = ":root";

        // the prefix of the root rules to consider
        const rulePrefix = "--";

        // create a map to store the results
        const results: Map<string, string> = new Map<string, string>();

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
                    results.set(name, value);
                }
            }
        }

        return results;
    }

    // reset all colors to their default values
    function resetAllColors() {
        colors.value = new Map<string, string>(defaultColors);

        for (const [key, value] of defaultColors) {
            document.documentElement.style.setProperty(key, value);
        }
    }

    // reset a single color to its default value
    function resetColor(key: string){
        const defaultColor: string | undefined = defaultColors.get(key);

        if(defaultColor){
            colors.value.set(key, defaultColor);
            document.documentElement.style.setProperty(key, defaultColor);
        }
    }

    // set the color of a CSS variable
    function setColor(key: string, event: Event) {
        // get the input element
        const input = event.target as HTMLInputElement;

        // update the color
        colors.value.set(key, input.value);
        document.documentElement.style.setProperty(key, input.value);
    }
</script>

<template>
    <div class="grid grid-cols-2 gap-6">
        <div>Dark theme</div>
        <div class="px-2">
            <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" v-model="darkTheme">
                <span class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-500"></span>
            </label>
        </div>

        <div>Theme colors</div>
        <div>
            <button class="border rounded px-2 border-red-500 text-red-500 hover:bg-red-500 hover:bg-opacity-20" @click="resetAllColors">Reset all colors</button>
        </div>

        <div class="col-span-2 text-sm font-mono">
            <div v-for="[key, value] in colors" :key="key" class="grid grid-cols-2 gap-6">
                <div>{{ key }}</div>
                <div class="flex items-center">
                    <input type="color" :value="value" @change="(e) => setColor(key, e)" class="bg-transparent">
                    <div class="ms-1">
                        <span>{{ value }}</span>
                        <button v-if="value !== defaultColors.get(key)" class="text-red-500 ms-3 hover:bg-red-500 hover:bg-opacity-20 rounded px-1" @click="() => resetColor(key)">Reset</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>