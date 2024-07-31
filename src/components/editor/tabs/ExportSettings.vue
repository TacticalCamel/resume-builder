<script setup lang="ts">
    import { settings, themeService } from "@/main";
    import { ref } from "vue";
    import { getDefaultSettings } from "@/models/SettingsModel";
    import ResumeModel from "@/models/ResumeModel";
    import FileUpload from "@/components/shared/FileUpload.vue";
    import Checkbox from "@/components/shared/Checkbox.vue";
    import EditorTab from "@/components/editor/tabs/EditorTab.vue";
    import EditorTabItem from "@/components/editor/tabs/EditorTabItem.vue";

    const resume = defineModel<ResumeModel | null>('resume', {
        required: true
    });

    const exportOptions = ref({
        resume: true,
        profile: true,
        themes: true
    });

    const sizes = ref({
        resume: JSON.stringify(resume.value, null, 2),
        profile: JSON.stringify(resume.value?.header.picture, null, 2),
        themes: JSON.stringify(themeService.themes, null, 2)
    });

    function sizeToString(size: number) {
        return size >= 1024 ? `${~~(size / 1024)} KB` : `${size} B`;
    }

    // import a resume from a JSON file
    function importResume(contents: string) {
        resume.value = JSON.parse(contents);
    }

    // export the resume as a JSON file
    function exportResume() {
        // get the JSON content
        const content = JSON.stringify(resume.value, null, 2);

        // create a blob from the content
        const blob = new Blob([content], {type: 'application/json'});

        // create a URL for the blob
        const url = URL.createObjectURL(blob);

        // create a link and click it to download the file
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.json';
        a.click();

        // revoke the url
        URL.revokeObjectURL(url);
    }

    // delete the current resume
    function resetResume() {
        resume.value = null;
    }

    // reset all settings
    function resetSettings() {
        Object.assign(settings, getDefaultSettings());
    }
</script>

<template>
    <editor-tab>
        <editor-tab-item title="included content">
            <div class="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 text-sm">
                <checkbox v-model="exportOptions.resume" label="Resume text"/>
                <div>{{ sizeToString(sizes.resume.length) }}</div>

                <checkbox v-model="exportOptions.profile" label="Profile picture"/>
                <div>{{ sizeToString(sizes.profile.length) }}</div>

                <checkbox v-model="exportOptions.themes" label="Themes"/>
                <div>{{ sizeToString(sizes.themes.length) }}</div>

                <div></div>
                <div class="border-t border-foreground/30 pt-1.5">{{ sizeToString((exportOptions.resume ? sizes.resume.length : 0) + (exportOptions.profile ? sizes.profile.length : 0) + (exportOptions.themes ? sizes.themes.length : 0)) }}</div>
            </div>
        </editor-tab-item>

        <editor-tab-item>
            <div class="flex gap-1.5">
                <file-upload @on-upload="importResume" id="cv-data" accept=".json" class="px-2 rounded border-2 border-primary bg-transparent hover:bg-primary transition-colors">
                    Import
                </file-upload>
                <button @click="exportResume" class="px-2 rounded border-2 border-primary bg-transparent hover:bg-primary transition-colors">
                    Export
                </button>
                <button @click="resetResume" class="px-2 rounded border-2 border-error hover:bg-error transition-colors">
                    Reset template
                </button>
            </div>
        </editor-tab-item>

        <!--
        <div class="grid grid-cols-[1fr_auto] justify-between items-center text-sm gap-1.5">
            <div>Reset settings</div>
            <button @click="resetSettings" class="px-2 rounded border-2 border-error hover:bg-error transition-colors">Reset</button>
        </div>
        -->
    </editor-tab>
</template>