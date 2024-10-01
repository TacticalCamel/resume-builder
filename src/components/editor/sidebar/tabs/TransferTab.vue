<script setup lang="ts">
    import { toRaw } from "vue";
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

    async function saveTemplate(copy: boolean) {
        if(!template.value) {
            return;
        }

        const raw: ResumeTemplate = {...toRaw(template.value)};

        if(copy) {
            raw.id = crypto.randomUUID();
        }

        await setTemplate(raw);
    }
</script>

<template>
    <editor-tab>
        <template-import v-model="template"/>

        <template-export :template="template"/>

        <editor-tab-item title="save template">
            <div class="grid grid-cols-2 text-sm gap-4 px-1">
                <button class="text-center p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors" @click="saveTemplate(true)">Save as copy</button>
            </div>
        </editor-tab-item>
    </editor-tab>
</template>