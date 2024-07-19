<script setup lang="ts">
    import ResumeModel from "@/models/ResumeModel";
    import { getDefaultSettings } from "@/models/SettingsModel";
    import ThemeSettings from "@/components/settings/ThemeSettings.vue";
    import LayoutSettings from "@/components/settings/LayoutSettings.vue";
    import { settings } from "@/main";
    import FileUpload from "@/components/shared/FileUpload.vue";
    import IconSettings from "@/components/icons/settings/IconSettings.vue";
    import ToggleSwitch from "@/components/shared/ToggleSwitch.vue";
    import FontSettings from "@/components/settings/FontSettings.vue";

    const resume = defineModel<ResumeModel | null>('resume', {
        required: true
    });

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
    <div class="fixed top-2 right-3 select-none z-10 no-print flex flex-col justify-start items-end gap-6">
        <button @click="settings.settingsOpen = !settings.settingsOpen" class="ms-auto p-2 hover:text-accent">
            <icon-settings class="size-8 setting-icon" :class="{'open': settings.settingsOpen}"/>
        </button>

        <transition name="appear">
            <div class="settings-modal bg-background rounded-lg" v-show="settings.settingsOpen">
                <div class="flex flex-col px-2 py-4 w-80">
                    <!-- general -->
                    <div class="text-sm flex flex-col gap-4">
                        <div class="flex justify-between">
                            <div>Monochrome</div>
                            <toggle-switch v-model="settings.monochrome"/>
                        </div>

                        <div class="flex justify-between">
                            <div>Editable</div>
                            <toggle-switch v-model="settings.editable"/>
                        </div>

                        <div class="grid gap-x-4 gap-y-2 grid-cols-2 text-sm font-semibold">
                            <file-upload @on-upload="importTemplate" id="cv-data" accept=".json" class="px-2 py-0.5 rounded border-2 border-accent bg-transparent hover:bg-accent transition-colors">
                                Import
                            </file-upload>
                            <button @click="resetTemplate" class="px-2 py-0.5 rounded border-2 border-error bg-transparent hover:bg-error transition-colors">
                                Reset template
                            </button>
                            <button @click="exportTemplate" class="px-2 py-0.5 rounded border-2 border-accent bg-transparent hover:bg-accent transition-colors">
                                Export
                            </button>
                            <button @click="resetSettings" class="px-2 py-0.5 rounded border-2 border-error bg-transparent hover:bg-error transition-colors">
                                Reset settings
                            </button>
                        </div>
                    </div>

                    <!-- fonts -->
                    <font-settings/>

                    <!-- themes -->
                    <theme-settings/>

                    <!-- layout -->
                    <layout-settings v-model:resume="resume"/>
                </div>
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
        padding-left: 12px;
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

    .setting-icon {
        transition: color 150ms, transform 400ms;
    }

    .setting-icon.open {
        transform: rotate(180deg);
    }

    .settings-modal > div > *:not(:last-child) {
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgb(var(--primary));
    }
</style>