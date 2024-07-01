<script setup lang="ts">
    import {onMounted, watch} from "vue";
    import type SettingsModel from "@/models/SettingsModel";
    import type ResumeModel from "@/models/ResumeModel";
    import {getDefaultSettings} from "@/models/SettingsModel";
    import ToggleSwitch from "@/components/shared/ToggleSwitch.vue";
    import FileUpload from "@/components/shared/FileUpload.vue";
    import ThemeSettings from "@/components/settings/ThemeSettings.vue";
    import IconClose from "@/components/icons/IconClose.vue";
    import LayoutSettings from "@/components/settings/LayoutSettings.vue";

    const settings = defineModel<SettingsModel>('settings', {
        required: true
    });

    const resume = defineModel<ResumeModel | null>('resume', {
        required: true
    });

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
            settings.value = JSON.parse(settingsValue);
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

    // toggle the settings panel
    function toggleSettings() {
        settings.value.settingsOpen = !settings.value.settingsOpen;
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

    // reset settings
    function resetSettings() {
        settings.value = getDefaultSettings();
    }
</script>

<template>
    <transition name="appear">
        <div class="h-full fixed top-0 right-0 z-10 select-none bg-background sm:border-s sm:border-gray-500 sm:w-auto me-[14px]" v-show="settings.settingsOpen">
            <!-- navigation -->
            <div class="flex justify-items-end bg-primary bg-opacity-10 py-2 px-8 items-center">
                <div class="text-2xl">Settings</div>
                <button @click="toggleSettings" class="rounded-full ms-auto p-2 hover:text-red-500 hover:bg-opacity-20 hover:bg-red-500 transition-colors">
                    <icon-close class="size-8"/>
                </button>
            </div>

            <div class="grid gap-y-8 p-4">
                <!-- themes -->
                <theme-settings v-model:settings="settings"/>

                <!-- layout -->
                <layout-settings v-model:settings="settings"/>

                <!-- resume -->
                <div class="flex flex-col gap-4 min-w-80 text-sm">
                    <div class="pb-1 border-b border-primary border-opacity-40 text-xl">Resume</div>

                    <div class="flex justify-between w-full px-2">
                        <div>Editable</div>
                        <toggle-switch v-model="settings.editable"/>
                    </div>

                    <div class="flex justify-between w-full px-2">
                        <div>Monochrome</div>
                        <toggle-switch v-model="settings.monochrome"/>
                    </div>

                    <div class="grid gap-x-4 gap-y-2 grid-cols-2">
                        <file-upload @on-upload="importTemplate" id="cv-data" accept=".json" class="rounded font-semibold text-accent hover:bg-accent hover:bg-opacity-20 text-nowrap px-2 py-0.5 border border-accent border-opacity-50 font-mono hover:transition-colors">
                            Import template
                        </file-upload>
                        <button @click="exportTemplate" class="rounded font-semibold text-accent hover:bg-accent hover:bg-opacity-20 text-nowrap px-2 py-0.5 border border-accent border-opacity-50 font-mono hover:transition-colors text-center">
                            Export template
                        </button>
                        <button @click="resetTemplate" class="rounded font-semibold text-red-500 hover:bg-red-500 hover:bg-opacity-20 text-nowrap px-2 py-0.5 border border-red-500 border-opacity-50 font-mono hover:transition-colors text-center">
                            Reset template
                        </button>
                        <button @click="resetSettings" class="rounded font-semibold text-red-500 hover:bg-red-500 hover:bg-opacity-20 text-nowrap px-2 py-0.5 border border-red-500 border-opacity-50 font-mono hover:transition-colors text-center">
                            Reset settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .appear-enter-active, .appear-leave-active {
        transition-property: transform, opacity;
        transition-duration: 150ms;
        transition-timing-function: ease-in-out;
    }

    .appear-enter-from, .appear-leave-to {
        transform: translate(1rem, 0);
        opacity: 0;
    }
</style>