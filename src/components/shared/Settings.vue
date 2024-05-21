<script setup lang="ts">
    import {onMounted, ref} from "vue";
    import type {PropType} from "vue";
    import FileUpload from "@/components/shared/FileUpload.vue";
    import type PageModel from "@/models/PageModel";

    const model = defineModel({
        type: Object as PropType<PageModel>,
        required: true
    });

    const colors = ref<Map<string, string>>(new Map());

    onMounted(() => {
        // listen for the "t" key to toggle the modal
        window.addEventListener('keydown', (event) => {
            if (event.key === 't') {
                isOpen.value = !isOpen.value;
            }
        });

        resetColors();
    });

    // whether the settings modal is open
    const isOpen = ref(false);

    // set the profile picture
    function setProfilePicture(contents: string) {
        model.value.profilePicture = contents;
    }

    // set the template
    function setTemplate(contents: string) {
        model.value.template = JSON.parse(contents);
    }

    // get all CSS variables from the root selector
    function getRootCssRules(): Map<string, string> {
        // the name of the root selector
        const rootSelector = ":root";

        // the prefix of the root rules to consider
        const rulePrefix = "--";

        // create a map to store the results
        const results: Map<string, string> = new Map();

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

    // set the color of a CSS variable
    function setColor(key: string, event: Event){
        // get the input element
        const input = event.target as HTMLInputElement;

        // update the CSS variable
        colors.value.set(key, input.value);
        document.documentElement.style.setProperty(key, input.value);
    }

    function resetColors(){
        colors.value = getRootCssRules();

        for (const [key, value] of colors.value) {
            document.documentElement.style.setProperty(key, value);
        }
    }
</script>

<template>
    <div class="w-screen h-screen bg-black bg-opacity-65 flex justify-center items-center absolute z-10 select-none" :class="{hidden: !isOpen}">
        <div class="w-full m-4 mobile:m-0 mobile:w-auto p-8 rounded-2xl grid gap-12 bg-[--primary-bg]">
            <div>
                <div class="mb-5 pb-3 border-b border-gray-500 text-2xl">Display settings</div>

                <div class="grid grid-cols-2 gap-6">
                    <div>Dark theme</div>
                    <div class="px-2">
                        <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" class="sr-only peer" v-model="model.isDarkTheme">
                            <span class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-500"></span>
                        </label>
                    </div>

                    <div>Theme colors</div>
                    <div>
                        <button class="border rounded px-2 border-red-500 text-red-500 hover:bg-red-500 hover:bg-opacity-20" @click="resetColors">Reset colors</button>
                    </div>

                    <div class="col-span-2 text-sm font-mono">
                        <div v-for="[key, value] in colors" :key="key" class="grid grid-cols-3 gap-4">
                            <div>{{ key.slice(2) }}</div>
                            <div class="flex items-center">
                                <input type="color" :value="value" @change="(e) => setColor(key, e)" class="bg-transparent">
                                <span class="ms-1">{{ value }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div class="mb-5 pb-3 border-b border-gray-500 text-2xl">Template settings</div>

                <div class="grid grid-cols-2 gap-6">
                    <div>Profile picture</div>
                    <FileUpload @onSuccess="setProfilePicture" id="cv-image" accept="image/*" read-data-url>
                        Upload
                    </FileUpload>

                    <div>Profile data</div>
                    <FileUpload @onSuccess="setTemplate" id="cv-data" accept=".json">
                        Upload
                    </FileUpload>
                </div>
            </div>
        </div>

    </div>
</template>