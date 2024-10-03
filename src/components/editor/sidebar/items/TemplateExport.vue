<script setup lang="ts">
    import { computed, ref } from "vue";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import InputCheckbox from "@/components/shared/form/InputCheckbox.vue";

    // defines a category of data that can be included for export
    interface DataCategory {
        include: boolean
        name: string
        addToTemplate: (template: Partial<ResumeTemplate>) => void
    }

    const {template} = defineProps<{
        template: ResumeTemplate
    }>();

    const categories = ref<DataCategory[]>([
        {
            include: true,
            name: 'resume',
            addToTemplate: (exported: Partial<ResumeTemplate>) => {
                exported.resume = template.resume;
            }
        },
        {
            include: true,
            name: 'themes',
            addToTemplate: (exported: Partial<ResumeTemplate>) => {
                exported.themes = template.themes;
                exported.currentTheme = template.currentTheme;
                exported.filters = template.filters;
            }
        },
        {
            include: true,
            name: 'fonts',
            addToTemplate: (exported: Partial<ResumeTemplate>) => {
                exported.fonts = template.fonts;
                exported.currentFont = template.currentFont;
            }
        }
    ]);

    const totalSize = computed<string>(() => {
        const size: number = JSON.stringify(template).length;

        return sizeToString(size);
    });

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

    function getExportedTemplate(): Partial<ResumeTemplate> {
        const exported: Partial<ResumeTemplate> = {
            id: template.id
        };

        for (const category of categories.value) {
            if (category.include) {
                category.addToTemplate(exported);
            }
        }

        return exported;
    }

    function exportTemplate(): void {
        const exported: Partial<ResumeTemplate> = {
            id: template.id
        };

        for (const category of categories.value) {
            if (category.include) {
                category.addToTemplate(exported);
            }
        }

        const content: string = JSON.stringify(exported);

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
        <div class="grid gap-4">
            <div class="grid gap-2">
                <input-checkbox
                    v-for="category in categories"
                    v-model="category.include"
                    class="rounded px-2 py-1 transition-colors text-foreground/70 border-2 border-foreground/30 hover:border-foreground focus:border-foreground"
                    :class="{'text-foreground/100': category.include}"
                >
                    Include {{ category.name }}
                </input-checkbox>
            </div>

            <div class="grid grid-cols-2 gap-2 items-center">
                <button @click="exportTemplate" class="text-center p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors text-foreground">Export</button>
                <span class="text-end me-1 text-foreground/70">File size: {{ totalSize }}</span>
            </div>
        </div>
    </editor-tab-item>
</template>