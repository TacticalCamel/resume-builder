<script setup lang="ts">
    import {onMounted, watch} from "vue";
    import type SettingsModel from "@/models/SettingsModel";
    import type ResumeModel from "@/models/ResumeModel";
    import {getDefaultSettings} from "@/models/SettingsModel";
    import ToggleSwitch from "@/components/shared/ToggleSwitch.vue";
    import FileUpload from "@/components/shared/FileUpload.vue";
    import ThemeSettings from "@/components/settings/ThemeSettings.vue";
    import LayoutSettings from "@/components/settings/LayoutSettings.vue";

    const settings = defineModel<SettingsModel>('settings', {
        required: true
    });

    const resume = defineModel<ResumeModel | null>('resume', {
        required: true
    });

    // handle model loading from local storage
    onMounted(() => {
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
        <div class="settings-modal fixed top-[4.5rem] right-3 z-10 select-none bg-background rounded-lg no-print" v-show="settings.settingsOpen">
            <div class="grid gap-y-8 p-4">
                <div class="flex flex-col gap-4 min-w-80 text-sm">
                    <div class="flex justify-between w-full px-2">
                        <div>Editable</div>
                        <toggle-switch v-model="settings.editable"/>
                    </div>

                    <div class="flex justify-between w-full px-2">
                        <div>Monochrome</div>
                        <toggle-switch v-model="settings.monochrome"/>
                    </div>

                    <div class="flex justify-between w-full px-2">
                        <div>Print page</div>
                        <div class="font-mono">
                            <span class="border border-b-2 rounded py-0.5 px-2 border-primary border-opacity-30">Ctrl</span>
                            +
                            <span class="border border-b-2 rounded py-0.5 px-2 border-primary border-opacity-30">P</span>
                        </div>
                    </div>

                    <div class="grid gap-x-4 gap-y-2 grid-cols-2 px-2">
                        <file-upload @on-upload="importTemplate" id="cv-data" accept=".json" class="rounded font-semibold text-background bg-accent px-2 py-0.5">
                            Import template
                        </file-upload>
                        <button @click="resetTemplate" class="rounded font-semibold text-background bg-error px-2 py-0.5">
                            Reset template
                        </button>
                        <button @click="exportTemplate" class="rounded font-semibold text-background bg-accent px-2 py-0.5">
                            Export template
                        </button>
                        <button @click="resetSettings" class="rounded font-semibold text-background bg-error px-2 py-0.5">
                            Reset settings
                        </button>
                    </div>
                </div>

                <!-- themes -->
                <theme-settings v-model:settings="settings"/>

                <!-- layout -->
                <layout-settings/>
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

    .settings-modal{
        overflow-y: auto;
        max-height: calc(100vh - 6rem);
        outline: 2px solid rgb(var(--accent));
    }

    .settings-modal::-webkit-scrollbar {
        width: 12px;
    }

    .settings-modal::-webkit-scrollbar-thumb {
        background-color: rgb(var(--primary));
        border-radius: 9999px;
        border: 4px solid rgb(var(--background));
    }
</style>