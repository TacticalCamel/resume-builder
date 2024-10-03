<script setup lang="ts">
    import { inject, Ref, ref } from "vue";
    import { useTemplates } from "@/composables/Templates";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import EditorTab from "@/components/editor/sidebar/generic/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import TemplateImport from "@/components/editor/sidebar/items/TemplateImport.vue";
    import TemplateExport from "@/components/editor/sidebar/items/TemplateExport.vue";

    const {setTemplate} = useTemplates();

    const template = defineModel<ResumeTemplate>({
        required: true
    });

    const {saveValue, frequency} = inject<{
        saveValue: () => Promise<void>,
        frequency: Ref<number>
    }>('autosave', {
        saveValue: async () => {},
        frequency: ref(0)
    });

    async function saveTemplateAsCopy() {
        await setTemplate({...template.value, id: crypto.randomUUID()});
    }

    function importTemplate(uploadedTemplate: ResumeTemplate) {
        template.value = uploadedTemplate;
    }

    function getAutosaveText(value: number): string {
        if (value < 0) {
            return 'Never';
        }

        if (value === 0) {
            return 'Always';
        }

        return `Every ${value} minute${value === 1 ? '' : 's'}`;
    }

    function getAutosaveValue(value: number): number {
        if (value <= 0) {
            return value;
        }

        return value * 60000;
    }
</script>

<template>
    <editor-tab>
        <template-import @import="importTemplate"/>

        <template-export :template="template"/>

        <editor-tab-item title="save template">
            <div class="grid grid-cols-2 gap-2">
                <div>Autosave</div>
                <select v-model="frequency" class="bg-background rounded outline outline-1 outline-foreground/30 py-0.5 px-1 h-6 focus:outline-foreground">
                    <option v-for="value in [-1, 0, 1, 2, 5, 10, 30]" :value="getAutosaveValue(value)">
                        {{ getAutosaveText(value) }}
                    </option>
                </select>

                <div>Save options</div>
                <div class="grid gap-2">
                    <button class="text-center p-0.5 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors" @click="saveValue">Save</button>
                    <button class="text-center p-0.5 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors" @click="saveTemplateAsCopy()">Save as copy</button>
                </div>
            </div>
        </editor-tab-item>
    </editor-tab>
</template>