<script setup lang="ts">
    import { computed, onBeforeMount, ref } from "vue";
    import { useThemeService } from "@/composables/ThemeService";
    import { useFontService } from "@/composables/FontService";
    import { ResumeModel } from "@/models/resume/Resume";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import InputCheckbox from "@/components/shared/form/InputCheckbox.vue";
    import IconRenew from "@/components/shared/icons/IconRenew.vue";

    const themeService = useThemeService();
    const fontService = useFontService();

    // defines a category of data that can be included for export
    interface DataCategory {
        include: boolean
        name: string
        size: number
        getSize: () => number
        addToTemplate: (template: ResumeTemplate) => void
    }

    const {resume} = defineProps<{
        resume: ResumeModel | undefined
    }>();

    // configuration for exporting the editor data
    const categories = ref<DataCategory[]>([
        {
            include: true,
            name: 'Resume',
            size: 0,
            getSize: () => JSON.stringify(resume).length,
            addToTemplate: (template: ResumeTemplate) => {
                template.resume = resume;
            }
        },
        {
            include: true,
            name: 'Current theme',
            size: 0,
            getSize: () => JSON.stringify(themeService.currentTheme).length,
            addToTemplate: (template: ResumeTemplate) => {
                template.theme = themeService.currentTheme;
            }
        },
        {
            include: true,
            name: 'Current font',
            size: 0,
            getSize: () => JSON.stringify({}).length,
            addToTemplate: (template: ResumeTemplate) => {
                template.font = {name: fontService.currentFont, data: undefined, system: 0};
            }
        }
    ]);

    const totalSize = computed<string>(() => {
        let size = 0;

        for (const category of categories.value) {
            if (!category.include) {
                continue;
            }

            size += category.size;
        }

        return sizeToString(size);
    });

    onBeforeMount(() => {
        calculateCategoryResults();
    });

    // recalculate the results of all data categories
    function calculateCategoryResults() {
        for (const category of categories.value) {
            category.size = category.getSize();
        }
    }

    // convert a size in bytes to a human-readable string
    function sizeToString(size: number): string {
        const units = [
            {size: Math.pow(2, 30), name: 'GB'},
            {size: Math.pow(2, 20), name: 'MB'},
            {size: Math.pow(2, 10), name: 'KB'}
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
    function exportFile(): void {
        const template: ResumeTemplate = {
            resume: undefined,
            theme: undefined,
            font: undefined
        };

        for (const category of categories.value) {
            if (category.include) {
                category.addToTemplate(template);
            }
        }

        const content: string = JSON.stringify(template);

        const blob = new Blob([content], {type: 'application/json'});

        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'editor.json';
        a.click();

        URL.revokeObjectURL(url);
    }
</script>

<template>
    <editor-tab-item title="export template">
        <div class="grid grid-cols-2 items-center gap-2 text-sm font-light text-foreground/70">
            <div class="grid grid-cols-subgrid col-span-2 gap-2 py-1">
                <template v-for="category in categories">
                    <input-checkbox v-model="category.include">{{ category.name }}</input-checkbox>
                    <div>{{ sizeToString(category.size) }}</div>
                </template>
            </div>

            <div class="grid grid-cols-subgrid col-span-2 pt-2 border-t border-foreground/30 font-medium text-foreground">
                <div class="px-1">
                    <button @click="exportFile" class="text-center w-full p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors">
                        Export
                    </button>
                </div>

                <div class="flex items-center gap-2">
                    <span class="basis-1/3 text-nowrap">{{ totalSize }}</span>
                    <button @click="calculateCategoryResults" class="flex justify-center items-center gap-1 p-1 rounded hover:bg-foreground/10 text-foreground/60 hover:text-foreground transition-colors text-xs">
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