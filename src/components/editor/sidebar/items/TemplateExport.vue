<script setup lang="ts">
    import { computed, onBeforeMount, ref } from "vue";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import InputCheckbox from "@/components/shared/form/InputCheckbox.vue";
    import IconRenew from "@/components/shared/icons/IconRenew.vue";

    // defines a category of data that can be included for export
    interface DataCategory {
        include: boolean
        name: string
        size: number
        getSize: () => number
        addToTemplate: (template: Partial<ResumeTemplate>) => void
    }

    const {template} = defineProps<{
        template: ResumeTemplate
    }>();

    const categories = ref<DataCategory[]>([
        {
            include: true,
            name: 'Resume',
            size: 0,
            getSize: () => JSON.stringify(template.resume).length,
            addToTemplate: (exported: Partial<ResumeTemplate>) => {
                exported.resume = template.resume;
            }
        },
        {
            include: true,
            name: 'Themes',
            size: 0,
            getSize: () => JSON.stringify(template.themes).length,
            addToTemplate: (exported: Partial<ResumeTemplate>) => {
                exported.themes = template.themes;
                exported.currentTheme = template.currentTheme;
            }
        },
        {
            include: true,
            name: 'Fonts',
            size: 0,
            getSize: () => JSON.stringify(template.fonts).length,
            addToTemplate: (exported: Partial<ResumeTemplate>) => {
                exported.fonts = template.fonts;
                exported.currentFont = template.currentFont;
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

    function calculateCategoryResults() {
        for (const category of categories.value) {
            category.size = category.getSize();
        }
    }

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

    function exportTemplate(): void {
        const template: Partial<ResumeTemplate> = {};

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
        a.download = 'template.json';
        a.click();

        URL.revokeObjectURL(url);
    }
</script>

<template>
    <editor-tab-item title="export to file">
        <div class="grid grid-cols-2 items-center gap-2 text-sm text-foreground/70">
            <div class="grid grid-cols-subgrid col-span-2 gap-2 py-1">
                <template v-for="category in categories">
                    <input-checkbox v-model="category.include">{{ category.name }}</input-checkbox>
                    <div>{{ sizeToString(category.size) }}</div>
                </template>
            </div>

            <div class="grid grid-cols-subgrid col-span-2 pt-2 border-t border-foreground/30 font-medium text-foreground">
                <div class="px-1">
                    <button @click="exportTemplate" class="text-center w-full p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors">
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