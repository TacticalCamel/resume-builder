<script setup lang="ts">
    import { computed, onBeforeMount, ref, toRaw } from "vue";
    import { useThemeService } from "@/composables/ThemeService";
    import { useTemplateService } from "@/composables/TemplateService";
    import { EditorSettings } from "@/models/EditorSettings";
    import { ResumeModel } from "@/models/resume/Resume";
    import InputFile from "@/components/shared/form/InputFile.vue";
    import EditorTab from "@/components/editor/sidebar/generic/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import InputCheckbox from "@/components/shared/form/InputCheckbox.vue";
    import IconRenew from "@/components/shared/icons/IconRenew.vue";
    import IconUploadFile from "@/components/shared/icons/IconUploadFile.vue";
    import IconCheck from "@/components/shared/icons/IconCheck.vue";
    import IconClose from "@/components/shared/icons/IconClose.vue";
    import InputToggle from "@/components/shared/form/InputToggle.vue";
    import InputRange from "@/components/shared/form/InputRange.vue";

    const themeService = useThemeService();
    const templateService = useTemplateService();

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

    const resume = defineModel<ResumeModel | undefined>('resume', {
        required: true
    });

    const settings = defineModel<EditorSettings>('settings', {
        required: true
    });

    const paperSizes: string[] = ['A3', 'A4', 'A5'];
    const paperOrientations: string[] = ['Portrait', 'Landscape'];

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

                const json = JSON.stringify(resume.value);

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
                if (!themeService.customThemes.length) {
                    return undefined;
                }

                return {
                    value: themeService.customThemes,
                    json: JSON.stringify(themeService.customThemes, null, 2)
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
        if (importedModel.value.data.resume) {
            resume.value = importedModel.value.data.resume;
        }

        if (importedModel.value.data.themes) {
            themeService.customThemes = importedModel.value.data.themes;
        }

        clearImportedData();
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

    async function saveAsTemplate(copy: boolean) {
        if(!resume.value) {
            return;
        }

        const raw: ResumeModel = toRaw(resume.value);

        if(copy) {
            raw.id = crypto.randomUUID();
        }

        await templateService.createTemplate(raw);
    }
</script>

<template>
    <editor-tab>
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

        <editor-tab-item title="export content">
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

        <!--
        <editor-tab-item title="print content">
            <div class="grid text-sm gap-2">
                <div class="flex items-center gap-2">
                    <input-toggle v-model="settings.printing.preview"/>
                    <span>Preview printing</span>
                </div>

                <div class="grid grid-cols-2 gap-2 items-center">
                    <span>Scale</span>
                    <input-range v-model="settings.printing.scale" :min="50" :max="150" :step="2.5" unit="%" :disabled="!settings.printing.preview"/>

                    <span>Size</span>
                    <select v-model="settings.printing.size" :disabled="!settings.printing.preview" class="bg-background rounded outline outline-1 outline-foreground/30 py-0.5 px-1 h-6 opacity-100 disabled:text-foreground/50 disabled:cursor-not-allowed focus:outline-foreground">
                        <option v-for="size in paperSizes" :value="size">{{ size }}</option>
                    </select>

                    <span>Orientation</span>
                    <select v-model="settings.printing.orientation" :disabled="!settings.printing.preview" class="bg-background rounded outline outline-1 outline-foreground/30 py-0.5 px-1 h-6 opacity-100 disabled:text-foreground/50 disabled:cursor-not-allowed focus:outline-foreground">
                        <option v-for="orientation in paperOrientations" :value="orientation">{{ orientation }}</option>
                    </select>
                </div>
            </div>
        </editor-tab-item>
        -->

        <editor-tab-item title="save as template">
            <div class="grid grid-cols-2 text-sm gap-4 px-1">
                <button class="text-center p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors" @click="saveAsTemplate(false)">Save</button>
                <button class="text-center p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors" @click="saveAsTemplate(true)">Save as copy</button>
            </div>
        </editor-tab-item>
    </editor-tab>
</template>