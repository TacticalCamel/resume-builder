<script setup lang="ts">
    import { computed, onBeforeMount, ref } from "vue";
    import { useThemeService } from "@/composables/ThemeService";
    import { ResumeModel } from "@/models/resume/Resume";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import InputCheckbox from "@/components/shared/form/InputCheckbox.vue";
    import IconRenew from "@/components/shared/icons/IconRenew.vue";

    const themeService = useThemeService();

    // defines the categories that the editor content is split into
    interface ExportModel {
        resume: DataCategory
        themes: DataCategory
        fonts: DataCategory
    }

    // defines a category of data that can be included for export
    interface DataCategory {
        include: boolean
        name: string
        result: { value: any, json: string } | undefined
        convert: () => { value: any, json: string } | undefined
    }

    const resume = defineModel<ResumeModel | undefined>({
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

    onBeforeMount(() => {
        calculateValues();
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
</script>

<template>
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
</template>

<style scoped lang="postcss">

</style>