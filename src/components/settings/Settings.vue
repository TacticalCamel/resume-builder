<script setup lang="ts">
    import {onMounted, watch} from "vue";
    import type SettingsModel from "@/models/SettingsModel";
    import type ResumeModel from "@/models/ResumeModel";
    import IconDoubleArrowLeft from "@/components/icons/IconDoubleArrowLeft.vue";
    import ToggleSwitch from "@/components/shared/ToggleSwitch.vue";
    import FileUpload from "@/components/shared/FileUpload.vue";
    import ThemeSettings from "@/components/settings/ThemeSettings.vue";

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
</script>

<template>
    <transition name="appear">
        <div class="h-full w-full absolute top-0 left-0 z-10 select-none bg-background sm:border-e sm:border-gray-500 sm:w-auto" v-show="settings.settingsOpen">
            <!-- navigation -->
            <div class="flex justify-items-end bg-primary bg-opacity-10 py-2 px-8 items-center">
                <div class="text-2xl">Settings</div>
                <button @click="toggleSettings" class="rounded-full ms-auto p-2 hover:text-red-500 hover:bg-opacity-20 hover:bg-red-500 transition-colors">
                    <icon-double-arrow-left class="size-8"/>
                </button>
            </div>

            <div class="grid gap-y-8 py-4 px-8">
                <!-- themes -->
                <theme-settings v-model:settings="settings"/>

                <div>
                    <div class="mb-4 pb-1 border-b border-gray-500 text-xl">Resume</div>
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
                            <file-upload @on-upload="importTemplate" id="cv-data" accept=".json" class="rounded font-semibold text-accent hover:bg-accent hover:bg-opacity-20 text-nowrap px-2 py-0.5 border border-accent border-opacity-50 font-mono hover:transition-colors">
                                Import template
                            </file-upload>
                            <button @click="exportTemplate" class="rounded font-semibold text-accent hover:bg-accent hover:bg-opacity-20 text-nowrap px-2 py-0.5 border border-accent border-opacity-50 font-mono hover:transition-colors text-center">
                                Export template
                            </button>
                            <button @click="resetTemplate" class="rounded font-semibold text-red-500 hover:bg-red-500 hover:bg-opacity-20 text-nowrap px-2 py-0.5 border border-red-500 border-opacity-50 font-mono hover:transition-colors text-center">
                                Reset template
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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