<script setup lang="ts">
    import { ref } from "vue";
    import { useThemeService } from "@/composables/ThemeService";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import IconClose from "@/components/shared/icons/IconClose.vue";
    import InputFile from "@/components/shared/form/InputFile.vue";
    import IconUploadFile from "@/components/shared/icons/IconUploadFile.vue";
    import IconCheck from "@/components/shared/icons/IconCheck.vue";
    import { ResumeModel } from "@/models/resume/Resume";

    const themeService = useThemeService();

    interface ImportModel {
        data: any | undefined | null
        fileName: string
        validate: ValidationStep[]
    }

    interface ValidationStep {
        title: string
        valid: boolean | undefined
    }

    const importedModel = ref<ImportModel>({
        data: undefined,
        fileName: '',
        validate: []
    });

    const resume = defineModel<ResumeModel | undefined>({
        required: true
    });

    function uploadFile(contents: string | ArrayBuffer, fileName: string) {
        if (typeof contents !== 'string') {
            return;
        }

        importedModel.value.validate = [];
        importedModel.value.fileName = fileName;

        try {
            importedModel.value.data = JSON.parse(contents);

            importedModel.value.validate.push({
                title: 'Valid JSON',
                valid: true
            });
        }
        catch (e) {
            importedModel.value.data = null;

            importedModel.value.validate.push({
                title: 'Invalid JSON',
                valid: false
            });
        }

        importedModel.value.validate.push({
            title: 'Data integrity (coming soon)',
            valid: undefined
        });
    }

    function importFile() {
        if (importedModel.value.data.resume) {
            resume.value = importedModel.value.data.resume;
        }

        /*if (importedModel.value.data.themes) {
            themeService.customThemes = importedModel.value.data.themes;
        }*/

        clearImportedData();
    }

    function clearImportedData() {
        importedModel.value.data = undefined;
    }
</script>

<template>
    <editor-tab-item title="import content">
        <div class="grid gap-4">
            <input-file @upload="uploadFile" accept=".json" format="text">
                <div class="flex gap-4 items-center justify-center rounded py-2 px-4 border border-dashed border-foreground/30 hover:bg-foreground/10 transition-colors text-foreground/70">
                    <icon-upload-file class="size-8"/>
                    <span class="font-light text-sm">Drag and drop files here <br/> or click to browse local files</span>
                </div>
            </input-file>

            <template v-if="importedModel.data !== undefined">
                <div class="grid gap-1 text-sm">
                    <div v-for="step in importedModel.validate" class="flex gap-2 items-center" :class="{'text-primary': step.valid === false, 'text-secondary': step.valid, 'text-foreground/70': step.valid === undefined}">
                        <icon-check v-if="step.valid" class="size-5"/>
                        <icon-close v-else-if="step.valid === false" class="size-5"/>
                        <span v-else class="size-5 text-center select-none">?</span>

                        <span>{{ step.title }}</span>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-2 text-sm">
                    <div class="px-1">
                        <button @click="importFile" :disabled="importedModel.data === null" class="text-center text-sm w-full p-1 rounded bg-foreground/10 hover:bg-foreground/20 disabled:bg-foreground/10 disabled:text-foreground/50 disabled:cursor-not-allowed transition-colors">
                            <span v-if="importedModel.validate.some(x => x.valid === false)">Import with errors</span>
                            <span v-else>Import</span>
                        </button>
                    </div>

                    <div class="flex items-center gap-2 text-foreground/70">
                        <span class="font-mono">{{ importedModel.fileName }}</span>

                        <button @click="clearImportedData" class="transition-colors hover:text-foreground p-1.5">
                            <icon-close class="size-4"/>
                        </button>
                    </div>
                </div>
            </template>
        </div>
    </editor-tab-item>
</template>