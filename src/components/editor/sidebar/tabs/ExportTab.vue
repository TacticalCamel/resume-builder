<script setup lang="ts">
    import { useTemplateService } from "@/composables/TemplateService";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import EditorTab from "@/components/editor/sidebar/generic/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import TemplateImport from "@/components/editor/sidebar/reusable/TemplateImport.vue";
    import TemplateExport from "@/components/editor/sidebar/reusable/TemplateExport.vue";

    const templateService = useTemplateService();

    const template = defineModel<ResumeTemplate>({
        required: true
    });

    async function saveAsTemplate(copy: boolean) {
        if(!template.value) {
            return;
        }

        const raw: ResumeTemplate = JSON.parse(JSON.stringify(template.value));

        if(copy) {
            raw.id = crypto.randomUUID();
        }

        await templateService.createTemplate(raw);
    }
</script>

<template>
    <editor-tab>
        <template-import v-model="template"/>

        <template-export :template="template"/>

        <editor-tab-item title="save to templates">
            <div class="grid grid-cols-2 text-sm gap-4 px-1">
                <button class="text-center p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors" @click="saveAsTemplate(false)">Save</button>
                <button class="text-center p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors" @click="saveAsTemplate(true)">Save as copy</button>
            </div>
        </editor-tab-item>
    </editor-tab>
</template>