<script setup lang="ts">
    import { ref } from "vue";
    import ResumeModel from "@/models/ResumeModel";
    import { getDefaultSettings } from "@/models/SettingsModel";
    import ThemeSettings from "@/components/settings/ThemeSettings.vue";
    import LayoutSettings from "@/components/settings/LayoutSettings.vue";
    import { settings } from "@/main";
    import FileUpload from "@/components/shared/FileUpload.vue";
    import IconSettings from "@/components/icons/settings/IconSettings.vue";
    import ToggleSwitch from "@/components/shared/ToggleSwitch.vue";
    import FontSettings from "@/components/settings/FontSettings.vue";
    import Checkbox from "@/components/shared/Checkbox.vue";
    import IconChevronRight from "@/components/icons/IconChevronRight.vue";

    const resume = defineModel<ResumeModel | null>('resume', {
        required: true
    });

    const exportOptions = ref({
        resume: true,
        profile: true,
        themes: true
    });

    const modelOpen = ref(false);

    function openModal() {
        modelOpen.value = true;
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
        Object.assign(settings, getDefaultSettings());
    }
</script>

<template>
    <div class="fixed top-2 right-3 z-10 no-print flex flex-col justify-start items-end gap-6">
        <button @click="settings.settingsOpen = !settings.settingsOpen" class="ms-auto p-2 hover:text-accent">
            <icon-settings class="size-8 setting-icon" :class="{'open': settings.settingsOpen}"/>
        </button>

        <transition name="appear">
            <div class="settings-modal bg-background rounded-lg" v-show="settings.settingsOpen">
                <div class="flex flex-col gap-3">
                    <div class="flex gap-2 items-center">
                        <icon-chevron-right class="size-6"/>
                        <span>Import or export content</span>
                    </div>

                    <div class="flex justify-between text-sm">
                        <div class="grid grid-cols-[auto_1fr] items-center gap-x-4">
                            <checkbox v-model="exportOptions.resume" label="Resume text"/>
                            <div>size</div>

                            <checkbox v-model="exportOptions.profile" label="Profile picture"/>
                            <div>size</div>

                            <checkbox v-model="exportOptions.themes" label="Themes"/>
                            <div>size</div>
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <file-upload @on-upload="importTemplate" id="cv-data" accept=".json" class="px-2 rounded border-2 border-accent bg-transparent hover:bg-accent transition-colors">
                                Import
                            </file-upload>
                            <button @click="exportTemplate" class="px-2 rounded border-2 border-accent bg-transparent hover:bg-accent transition-colors">
                                Export
                            </button>
                            <button @click="resetTemplate" class="px-2 rounded border-2 border-error hover:bg-error transition-colors">
                                Reset template
                            </button>
                        </div>
                    </div>
                </div>

                <!-- general -->
                <div class="flex flex-col gap-3">
                    <div class="flex gap-2 items-center">
                        <icon-settings class="size-6"/>
                        <span>General</span>
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <div class="flex justify-between items-center text-sm pe-1 py-0.5">
                            <div>Enable editing</div>
                            <toggle-switch v-model="settings.editable"/>
                        </div>

                        <div class="flex justify-between items-center text-sm pe-1 py-0.5">
                            <div>Grayscale display</div>
                            <toggle-switch v-model="settings.monochrome"/>
                        </div>
                    </div>

                    <div class="grid grid-cols-[1fr_auto] justify-between items-center text-sm gap-1.5">
                        <div>Import or export content</div>
                        <button @click="openModal" class="px-2 rounded border-2 border-accent hover:bg-accent transition-colors">Import / Export</button>

                        <div>Reset settings</div>
                        <button @click="resetSettings" class="px-2 rounded border-2 border-error hover:bg-error transition-colors">Reset</button>
                    </div>
                </div>

                <!-- fonts -->
                <font-settings/>

                <!-- themes -->
                <theme-settings/>

                <!-- layout -->
                <layout-settings v-model:resume="resume"/>
            </div>
        </transition>
    </div>
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

    .settings-modal {
        overflow-y: scroll;
        overflow-x: hidden;
        padding: 1.25rem 0.5rem 1.25rem 1.25rem;
        width: 21.75rem;
        max-height: calc(100vh - 7rem);
        outline: 2px solid rgb(var(--accent));
    }

    .settings-modal > *:not(:last-child) {
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgb(var(--primary));
    }

    .settings-modal::-webkit-scrollbar {
        width: 0.75rem;
    }

    .settings-modal::-webkit-scrollbar-thumb {
        background-color: rgb(var(--primary));
        border-radius: 9999px;
        border: 0.25rem solid rgb(var(--background));
    }

    .setting-icon {
        transition: color 150ms, transform 400ms;
    }

    .setting-icon.open {
        transform: rotate(180deg);
    }
</style>