<script setup lang="ts">
    import {onMounted, watch} from "vue";
    import type Color from "@/models/Color";
    import type SettingsModel from "@/models/SettingsModel";
    import type ResumeModel from "@/models/ResumeModel";
    import IconDoubleArrowLeft from "@/components/icons/IconDoubleArrowLeft.vue";
    import ToggleSwitch from "@/components/shared/ToggleSwitch.vue";
    import FileUpload from "@/components/shared/FileUpload.vue";

    const settings = defineModel<SettingsModel>('settings', {
        required: true
    });

    const resume = defineModel<ResumeModel | null>('resume', {
        required: true
    });

    // get the default color values from CSS
    const defaultColors: Map<string, string> = getRootCssRules();

    // handle model loading from local storage
    onMounted(() => {
        // toggle settings on 'Alt + C'
        window.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 'c') {
                toggleSettings();
            }
        });

        // load the settings from local storage
        const settingsValue: string | null = localStorage.getItem('settings');

        // if there are settings to load, apply them
        if (settingsValue != null) {
            const loadedSettings: SettingsModel = JSON.parse(settingsValue);

            for(const [key, value] of defaultColors){
                const match: Color | undefined = loadedSettings.colors.find(color => color.name === key);

                if(match){
                    setColor(key, match.value);
                }
                else{
                    loadedSettings.colors.push({
                        name: key,
                        value: value
                    });
                }
            }

            settings.value = loadedSettings;
        }

        // load the resume from local storage
        const resumeValue: string | null = localStorage.getItem('resume');

        if (resumeValue != null) {
            resume.value = JSON.parse(resumeValue);
        }
    });

    // watch for changes in the settings model
    watch(settings, (value) => {
        localStorage.setItem('settings', JSON.stringify(value));
    }, {deep: true});

    // watch for changes in the resume model
    watch(resume, (value) => {
        if (value) {
            localStorage.setItem('resume', JSON.stringify(value));
        }
        else {
            localStorage.removeItem('resume');
        }
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

    // toggle the settings panel
    function toggleSettings() {
        settings.value.settingsOpen = !settings.value.settingsOpen;
    }

    // reset all colors to their default values
    function resetAllColors() {
        settings.value.colors = [];

        for (const [key, value] of defaultColors) {
            settings.value.colors.push({
                name: key,
                value: value
            });

            document.documentElement.style.setProperty(key, value);
        }
    }

    // reset a single color to its default value
    function resetColor(color: Color) {
        const defaultColor: string | undefined = defaultColors.get(color.name);

        if (defaultColor) {
            color.value = defaultColor;
            document.documentElement.style.setProperty(color.name, defaultColor);
        }
    }

    // set the color of a CSS variable
    function onColorChange(color: Color, event: Event) {
        // get the input element
        const input = event.target as HTMLInputElement;

        // update the color in the model
        color.value = input.value;

        // update the color in CSS
        setColor(color.name, input.value);
    }

    // update the color in CSS
    function setColor(key: string, value: string) {
        document.documentElement.style.setProperty(key, value);
    }

    // import a cv template from a JSON file
    function importTemplate(contents: string) {
        resume.value = JSON.parse(contents);
    }

    // export the current cv template as a JSON file
    function exportTemplate() {
        // get the JSON content
        const content = JSON.stringify(resume.value, null, 4);

        // create a blob from the content
        const blob = new Blob([content], {type: 'application/json'});

        // create a URL for the blob
        const url = URL.createObjectURL(blob);

        // create a link and click it to download the file
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cv.json';
        a.click();

        // revoke the url
        URL.revokeObjectURL(url);
    }

    // delete the template
    function resetTemplate() {
        resume.value = null;
    }
</script>

<template>
    <transition name="appear">
        <div class="h-full w-full absolute top-0 left-0 z-10 flex justify-center items-center select-none bg-[--primary-bg] sm:border-e sm:border-gray-500 sm:w-auto" v-show="settings.settingsOpen">
            <div class="m-4 mobile:m-0 px-8 grid gap-8">
                <div>
                    <div class="mb-4 pb-1 border-b border-gray-500 text-2xl">Theme</div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>Dark theme</div>
                        <div class="px-2">
                            <toggle-switch v-model="settings.darkTheme"/>
                        </div>

                        <div>Theme colors</div>
                        <div>
                            <button class="border rounded px-2 border-red-500 text-red-500 hover:bg-red-500 hover:bg-opacity-20 hover:transition-colors" @click="resetAllColors">Reset all colors</button>
                        </div>

                        <div class="col-span-2 text-sm font-mono">
                            <div v-for="color in settings.colors" :key="color.name" class="grid grid-cols-2 gap-4">
                                <div>{{ color.name.substring(2) }}</div>
                                <div class="flex items-center">
                                    <input type="color" :value="color.value" @change="(e) => onColorChange(color, e)" class="bg-transparent">
                                    <div class="ms-1">
                                        <span>{{ color.value }}</span>
                                        <button v-if="color.value !== defaultColors.get(color.name)" class="text-red-500 ms-3 hover:bg-red-500 hover:bg-opacity-20 rounded px-1 hover:transition-colors" @click="() => resetColor(color)">Reset</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="mb-4 pb-1 border-b border-gray-500 text-2xl">Resume</div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>Editable</div>
                        <div class="px-2">
                            <toggle-switch v-model="settings.editable"/>
                        </div>

                        <div>Monochrome</div>
                        <div class="px-2">
                            <toggle-switch v-model="settings.monochrome"/>
                        </div>

                        <div>Actions</div>
                        <div class="grid gap-3 text-sm">
                            <file-upload @on-upload="importTemplate" id="cv-data" accept=".json" class="rounded font-semibold text-violet-500 hover:bg-violet-500 hover:bg-opacity-20 text-nowrap px-2 py-0.5 border border-violet-500 border-opacity-50 font-mono hover:transition-colors">
                                Import template
                            </file-upload>
                            <button @click="exportTemplate" class="rounded font-semibold text-violet-500 hover:bg-violet-500 hover:bg-opacity-20 text-nowrap px-2 py-0.5 border border-violet-500 border-opacity-50 font-mono hover:transition-colors text-center">
                                Export template
                            </button>
                            <button @click="resetTemplate" class="rounded font-semibold text-red-500 hover:bg-red-500 hover:bg-opacity-20 text-nowrap px-2 py-0.5 border border-red-500 border-opacity-50 font-mono hover:transition-colors text-center">
                                Reset template
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <button @click="toggleSettings" class="absolute top-0 end-0 rounded-full p-2 m-2 hover:text-red-500 hover:bg-opacity-20 hover:bg-red-500 transition-colors">
                <icon-double-arrow-left class="size-8"/>
            </button>
        </div>
    </transition>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .appear-enter-active, .appear-leave-active {
        transition: transform 150ms ease-in-out;
    }

    .appear-enter-from, .appear-leave-to {
        transform: translate(-100%, 0);
    }
</style>