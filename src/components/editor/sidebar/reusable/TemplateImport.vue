<script setup lang="ts">
    import { reactive } from "vue";
    import { useThemeService } from "@/composables/ThemeService";
    import { useFontService } from "@/composables/FontService";
    import { ResumeModel } from "@/models/resume/Resume";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import InputFile from "@/components/shared/form/InputFile.vue";
    import IconClose from "@/components/shared/icons/IconClose.vue";
    import IconUploadFile from "@/components/shared/icons/IconUploadFile.vue";
    import IconCheck from "@/components/shared/icons/IconCheck.vue";

    const themeService = useThemeService();
    const fontService = useFontService();

    interface ImportModel {
        template?: any
        fileName?: string
        validationSteps: ValidationStep[]
    }

    interface ValidationStep {
        title: string
        valid: boolean | undefined
    }

    const model = reactive<ImportModel>({
        validationSteps: []
    });

    const resume = defineModel<ResumeModel | undefined>({
        required: true
    });

    function validateFile(contents: string | ArrayBuffer, fileName: string) {
        if (typeof contents !== 'string') {
            return;
        }

        model.template = undefined;
        model.fileName = fileName;
        model.validationSteps = [];

        try {
            model.template = JSON.parse(contents);

            model.validationSteps.push({
                title: 'Valid JSON',
                valid: true
            });
        }
        catch (e) {
            model.validationSteps.push({
                title: 'Invalid JSON',
                valid: false
            });
        }

        model.validationSteps.push({
            title: 'Data integrity (coming soon)',
            valid: undefined
        });
    }

    function importFile() {
        if (model.template.resume) {
            resume.value = model.template.resume;
        }

        if (model.template.theme) {
            themeService.addTheme(model.template.theme)
            themeService.currentTheme = model.template.theme.id;
        }

        if(model.template?.font.name) {
            fontService.currentFont = model.template.font.name;
        }

        clearForm();
    }

    function clearForm() {
        model.template = undefined;
    }
</script>

<template>
    <editor-tab-item title="import template">
        <div class="grid gap-4">
            <input-file @upload="validateFile" accept=".json" format="text">
                <div class="flex gap-4 items-center justify-center rounded py-2 px-4 border border-dashed border-foreground/30 hover:bg-foreground/10 transition-colors text-foreground/70">
                    <icon-upload-file class="size-8"/>
                    <span class="font-light text-sm">Drag and drop files here <br/> or click to browse local files</span>
                </div>
            </input-file>

            <template v-if="model.template !== undefined">
                <div class="grid gap-1 text-sm">
                    <div v-for="step in model.validationSteps" class="flex gap-2 items-center" :class="{'text-primary': step.valid === false, 'text-secondary': step.valid, 'text-foreground/70': step.valid === undefined}">
                        <icon-check v-if="step.valid" class="size-5"/>
                        <icon-close v-else-if="step.valid === false" class="size-5"/>
                        <span v-else class="size-5 text-center select-none">?</span>

                        <span>{{ step.title }}</span>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-2 text-sm">
                    <div class="px-1">
                        <button @click="importFile" :disabled="!model.template" class="text-center text-sm w-full p-1 rounded bg-foreground/10 hover:bg-foreground/20 disabled:bg-foreground/10 disabled:text-foreground/50 disabled:cursor-not-allowed transition-colors">
                            <span v-if="model.validationSteps.some(x => x.valid === false)">Import with errors</span>
                            <span v-else>Import</span>
                        </button>
                    </div>

                    <div class="flex items-center gap-2 text-foreground/70">
                        <span class="font-mono">{{ model.fileName }}</span>

                        <button @click="clearForm" class="transition-colors hover:text-foreground p-1.5">
                            <icon-close class="size-4"/>
                        </button>
                    </div>
                </div>
            </template>
        </div>
    </editor-tab-item>
</template>