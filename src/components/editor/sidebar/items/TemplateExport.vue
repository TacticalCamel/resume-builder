<script setup lang="ts">
    import { computed, reactive } from "vue";
    import { pack } from 'msgpackr';
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import InputCheckbox from "@/components/shared/form/InputCheckbox.vue";

    interface TransferCategory {
        name: string
        included: boolean
        copy: (source: ResumeTemplate, destination: Partial<ResumeTemplate>) => void
    }

    const {template} = defineProps<{
        template: ResumeTemplate
    }>();

    const categories = reactive<TransferCategory[]>([
        {
            name: 'resume',
            included: true,
            copy: (source: ResumeTemplate, destination: Partial<ResumeTemplate>) => {
                destination.resume = source.resume;
            }
        },
        {
            name: 'themes',
            included: true,
            copy: (source: ResumeTemplate, destination: Partial<ResumeTemplate>) => {
                destination.themes = source.themes;
                destination.currentTheme = source.currentTheme;
                destination.filters = source.filters;
            }
        },
        {
            name: 'fonts',
            included: true,
            copy: (source: ResumeTemplate, destination: Partial<ResumeTemplate>) => {
                destination.fonts = source.fonts;
                destination.currentFont = source.currentFont;
            }
        }
    ]);

    const buffer = computed<Uint8Array>(() => {
        const exported: Partial<ResumeTemplate> = {
            id: template.id
        };

        for (const category of categories) {
            if (category.included) {
                category.copy(template, exported);
            }
        }

        return pack(exported);
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

    function exportTemplate(): void {
        const blob = new Blob([buffer.value], {type: 'application/octet-stream'});

        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `template-${template.id}.msgpack`;
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
                    v-model="category.included"
                    class="rounded px-2 py-1 transition-colors text-foreground/70 border-2 border-foreground/30 hover:border-foreground focus:border-foreground"
                    :class="{'text-foreground/100': category.included}"
                >
                    Include {{ category.name }}
                </input-checkbox>
            </div>

            <div class="grid grid-cols-2 gap-2 items-center">
                <button @click="exportTemplate" class="text-center p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors text-foreground">Export</button>
                <span class="text-end me-1 text-foreground/70">File size: {{ sizeToString(buffer.length) }}</span>
            </div>
        </div>
    </editor-tab-item>
</template>