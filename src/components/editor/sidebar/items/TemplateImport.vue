<script setup lang="ts">
    import { reactive } from "vue";
    import { unpack } from "msgpackr";
    import { useTemplates } from "@/composables/useTemplates";
    import { useNotifications } from "@/composables/useNotifications";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import InputFile from "@/components/shared/form/InputFile.vue";
    import IconClose from "@/components/shared/icons/IconClose.vue";
    import IconUploadFile from "@/components/shared/icons/IconUploadFile.vue";
    import IconCheck from "@/components/shared/icons/IconCheck.vue";

    const {setTemplate} = useTemplates();
    const {displayNotification} = useNotifications();

    interface ImportModel {
        template?: any
        fileName?: string
        validationSteps: ValidationStep[]
    }

    interface ValidationStep {
        title: string
        valid: boolean | undefined
    }

    const form = reactive<ImportModel>({
        validationSteps: []
    });

    function validateFile(contents: string | ArrayBuffer, fileName: string): void {
        if (typeof contents === 'string') {
            return;
        }

        form.template = undefined;
        form.fileName = fileName;
        form.validationSteps = [];

        try {
            form.template = unpack(contents);

            form.validationSteps.push({
                title: 'Valid format',
                valid: true
            });
        }
        catch (e) {
            form.validationSteps.push({
                title: 'Invalid format',
                valid: false
            });
        }

        form.validationSteps.push({
            title: 'Data integrity',
            valid: undefined
        });
    }

    async function importTemplate() {
        await setTemplate(form.template, true);

        displayNotification('success', {
            message: 'Imported template',
            duration: 6000
        });

        clearForm();
    }

    function clearForm(): void {
        form.template = undefined;
    }
</script>

<template>
    <editor-tab-item title="import from file">
        <div class="grid gap-4">
            <input-file @upload="validateFile" accept=".msgpack" format="binary">
                <div class="flex gap-4 items-center justify-center rounded py-2 px-4 border border-dashed border-foreground/30 hover:bg-foreground/10 transition-colors text-foreground/70">
                    <icon-upload-file class="size-8"/>
                    <span>Drag and drop files here <br/> or click to browse local files</span>
                </div>
            </input-file>

            <template v-if="form.template !== undefined">
                <div class="grid gap-1">
                    <div v-for="step in form.validationSteps" class="flex gap-2 items-center" :class="{'text-primary': step.valid === false, 'text-secondary': step.valid, 'text-foreground/70': step.valid === undefined}">
                        <icon-check v-if="step.valid" class="size-5"/>
                        <icon-close v-else-if="step.valid === false" class="size-5"/>
                        <span v-else class="size-5 text-center select-none">?</span>

                        <span>{{ step.title }}</span>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-2">
                    <div class="px-1">
                        <button @click="importTemplate()" :disabled="!form.template" class="text-center w-full p-1 rounded bg-foreground/10 hover:bg-foreground/20 disabled:bg-foreground/10 disabled:text-foreground/50 disabled:cursor-not-allowed transition-colors">
                            <span v-if="form.validationSteps.some(x => x.valid === false)">Import with errors</span>
                            <span v-else>Import</span>
                        </button>
                    </div>

                    <div class="flex items-center gap-2 text-foreground/70">
                        <span class="font-mono">{{ form.fileName }}</span>

                        <button @click="clearForm()" class="transition-colors hover:text-error p-1">
                            <icon-close class="size-5"/>
                        </button>
                    </div>
                </div>
            </template>
        </div>
    </editor-tab-item>
</template>