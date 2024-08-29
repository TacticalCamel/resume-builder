<script setup lang="ts">
    import { computed, onBeforeMount, ref } from "vue";
    import { themeService } from "@/main";
    import InputFile from "@/components/shared/InputFile.vue";
    import EditorTab from "@/components/editor/sidebar/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/EditorTabItem.vue";
    import InputCheckbox from "@/components/shared/InputCheckbox.vue";
    import IconRenew from "@/components/icons/IconRenew.vue";
    import IconUploadFile from "@/components/icons/IconUploadFile.vue";
    import IconCheck from "@/components/icons/IconCheck.vue";
    import IconClose from "@/components/icons/IconClose.vue";
    import ResumeModel from "@/models/resume/ResumeModel";

    // defines a category of data that can be included for export
    interface DataCategory {
        include: boolean
        name: string
        result: { value: any, json: string } | undefined
        convert: () => { value: any, json: string } | undefined
    }

    // defines the categories that the editor content is split into
    interface ExportModel {
        resume: DataCategory
        themes: DataCategory
        fonts: DataCategory
    }

    interface ImportModel {
        data: any | undefined | null
        fileName: string
        validate: ValidationStep[]
    }

    interface ValidationStep {
        title: string
        valid: boolean | undefined
    }

    onBeforeMount(() => {
        calculateValues();
    });

    // the resume loaded in the editor
    const resume = defineModel<ResumeModel | null>('resume', {
        required: true
    });

    // configuration for exporting the editor data
    const options = ref<ExportModel>({
        resume: {
            include: true,
            name: 'Resume text',
            result: undefined,
            convert: () => {
                if (!resume.value) {
                    return undefined;
                }

                const json = ResumeModel.serializer.serialize(resume.value);

                return {
                    value: JSON.parse(json),
                    json: json
                };
            },
        },
        themes: {
            include: true,
            name: 'Themes',
            result: undefined,
            convert: () => {
                if (!themeService.themes.length) {
                    return undefined;
                }

                return {
                    value: themeService.themes,
                    json: JSON.stringify(themeService.themes, null, 2)
                };
            }
        },
        fonts: {
            include: true,
            name: 'Fonts',
            result: undefined,
            convert: () => undefined
        }
    });

    const totalSize = computed(() => {
        let size = 0;

        for (const key in options.value) {
            if (!options.value[key as keyof ExportModel].include) {
                continue;
            }

            const result = options.value[key as keyof ExportModel].result;

            if (result) {
                size += result.json.length;
            }
        }

        return sizeToString(size);
    });

    const importedModel = ref<ImportModel>({
        data: undefined,
        fileName: '',
        validate: []
    });

    // recalculate the values of data categories
    function calculateValues() {
        for (const key in options.value) {
            options.value[key as keyof ExportModel].result = options.value[key as keyof ExportModel].convert();
        }
    }

    // convert a size in bytes to a human-readable string
    function sizeToString(size: number | undefined) {
        if (size === undefined) {
            return '-';
        }

        const units = [
            {
                size: Math.pow(2, 30),
                name: 'GB'
            },
            {
                size: Math.pow(2, 20),
                name: 'MB'
            },
            {
                size: Math.pow(2, 10),
                name: 'KB'
            }
        ];

        for (const unit of units) {
            if (size >= unit.size) {
                const number = size / unit.size;
                const decimals = number >= 100 ? 0 : number >= 10 ? 1 : 2;

                return `${number.toFixed(decimals)} ${unit.name}`;
            }
        }

        return `${size} B`;
    }

    // upload a JSON file
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

    // load the uploaded data into the editor
    function importFile() {
        if (importedModel.value.data) {
            importedModel.value.data.resume.header.picture = importedModel.value.data.picture ?? null;
            resume.value = ResumeModel.serializer.deserialize(importedModel.value.data.resume);
        }

        if (importedModel.value.data.themes) {
            themeService.themes = importedModel.value.data.themes;
        }
    }

    // export the editor data to a JSON file
    function exportFile() {
        // create an empty object
        const model: any = {};

        // iterate over the categories and add the data to the model
        for (const key in options.value) {
            if (!options.value[key as keyof ExportModel].include) {
                continue;
            }

            model[key] = options.value[key as keyof ExportModel].result?.value;
        }

        // get the JSON content
        const content: string = JSON.stringify(model);

        // create a blob from the content
        const blob = new Blob([content], {type: 'application/json'});

        // create a URL for the blob
        const url = URL.createObjectURL(blob);

        // create a link and click it to download the file
        const a = document.createElement('a');
        a.href = url;
        a.download = 'editor.json';
        a.click();

        // revoke the url
        URL.revokeObjectURL(url);
    }

    function clearImportedData() {
        importedModel.value.data = undefined;
    }
</script>

<template>
    <editor-tab>
        <editor-tab-item title="export editor data">
            <div class="grid grid-cols-2 items-center gap-2 text-sm font-light text-foreground/70">
                <template v-for="category in options">
                    <input-checkbox v-model="category.include" :disabled="!category.result">{{ category.name }}</input-checkbox>
                    <div>{{ sizeToString(category.result?.json.length) }}</div>
                </template>

                <div class="grid grid-cols-subgrid col-span-2 pt-2 border-t border-foreground/30 font-medium text-foreground">
                    <div class="px-1">
                        <button @click="exportFile" class="text-center w-full p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors">
                            Export
                        </button>
                    </div>

                    <div class="flex items-center gap-2">
                        <span class="basis-1/3 text-nowrap">{{ totalSize }}</span>
                        <button @click="calculateValues" class="flex justify-center items-center gap-1 p-1 rounded hover:bg-foreground/10 text-foreground/60 hover:text-foreground transition-colors text-xs">
                            <icon-renew class="size-4"/>
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>
            </div>
        </editor-tab-item>

        <editor-tab-item title="import editor data">
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
    </editor-tab>
</template>