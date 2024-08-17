<script setup lang="ts">
    import { computed, onBeforeMount, ref } from "vue";
    import { themeService } from "@/main";
    import ResumeModel from "@/models/ResumeModel";
    import InputFile from "@/components/shared/InputFile.vue";
    import EditorTab from "@/components/editor/sidebar/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/EditorTabItem.vue";
    import InputCheckbox from "@/components/shared/InputCheckbox.vue";
    import IconReset from "@/components/icons/IconReset.vue";

    // defines a category of data that can be included for export
    interface DataCategory {
        include: boolean
        name: string
        getJson: () => string | undefined
        value: string | undefined
    }

    // defines the categories that the editor content is split into
    interface ExportModel {
        resume: DataCategory
        picture: DataCategory
        themes: DataCategory
        fonts: DataCategory
    }

    onBeforeMount(() => {
        calculateSizes();
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
            getJson: () => {
                if (!resume.value) {
                    return undefined;
                }

                if (resume.value.header.picture) {
                    const picture: string | null = resume.value.header.picture;

                    resume.value.header.picture = null;

                    const json = JSON.stringify(resume.value, null, 2);

                    resume.value.header.picture = picture;

                    return json;
                }

                return JSON.stringify(resume.value, null, 2);
            },
            value: undefined
        },
        picture: {
            include: true,
            name: 'Profile picture',
            getJson: () => resume.value?.header.picture ? JSON.stringify(resume.value?.header.picture, null, 2) : undefined,
            value: undefined
        },
        themes: {
            include: false,
            name: 'Themes',
            getJson: () => JSON.stringify(themeService.themes, null, 2),
            value: undefined
        },
        fonts: {
            include: false,
            name: 'Fonts',
            getJson: () => undefined,
            value: undefined
        }
    });

    const totalSize = computed(() => {
        let size = 0;

        for (const key in options.value) {
            if (!options.value[key as keyof ExportModel].include) {
                continue;
            }

            const value = options.value[key as keyof ExportModel].value;

            if (value) {
                size += value.length;
            }
        }

        return size;
    });

    function calculateSizes() {
        for (const key in options.value) {
            options.value[key as keyof ExportModel].value = options.value[key as keyof ExportModel].getJson();
        }
    }

    // convert a size in bytes to a human-readable string
    function sizeToString(size: number | undefined) {
        size ??= 0;

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
                return `${~~(size / unit.size)} ${unit.name}`;
            }
        }

        return `${size} B`;
    }

    // import a resume from a JSON file
    function importResume(contents: string | ArrayBuffer) {
        if (typeof contents !== 'string') {
            return;
        }

        resume.value = JSON.parse(contents);
    }

    // export the resume as a JSON file
    function exportResume() {
        // create an empty object
        const model: any = {};

        // iterate over the categories and add the data to the model
        for (const key in options.value) {
            if (!options.value[key as keyof ExportModel].include) {
                continue;
            }

            model[key] = options.value[key as keyof ExportModel].value;
        }

        // get the JSON content
        const content: string = JSON.stringify(model, null, 2);

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
</script>

<template>
    <editor-tab>
        <editor-tab-item title="export editor data">
            <div class="grid grid-cols-2 items-center gap-y-2 text-sm font-light text-foreground/70">
                <template v-for="category in options">
                    <input-checkbox v-model="category.include">{{ category.name }}</input-checkbox>
                    <div>{{ sizeToString(category.value?.length) }}</div>
                </template>

                <div class="pt-2.5 pb-0.5 pe-2.5 border-t border-foreground/30 flex justify-end text-xs font-light">
                    <button @click="calculateSizes" class="flex justify-center items-center gap-1 p-1 rounded hover:bg-foreground/10 text-foreground/60 hover:text-foreground transition-colors">
                        <span>Refresh</span>
                        <icon-reset class="size-3"/>
                    </button>
                </div>

                <div class="pt-2 border-t border-foreground/30 flex items-center gap-2 font-medium text-foreground">
                    <span class="basis-1/3 text-nowrap">{{ sizeToString(totalSize) }}</span>
                    <button @click="exportResume" class="text-center grow p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors">
                        Export
                    </button>
                </div>
            </div>
        </editor-tab-item>

        <editor-tab-item>
            <input-file @on-upload="importResume" accept=".json" format="text" class="flex justify-center items-center gap-2 p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors text-sm">
                Import
            </input-file>
        </editor-tab-item>
    </editor-tab>
</template>