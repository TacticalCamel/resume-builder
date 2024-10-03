<script setup async lang="ts">
    import { provide } from "vue";
    import { useTemplates } from "@/composables/Templates";
    import { useAutosave } from "@/composables/Autosave";
    import { usePersistentRef } from "@/composables/PersistentRef";
    import { useFonts } from "@/composables/Fonts";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import EditorSidebar from "@/components/editor/sidebar/EditorSidebar.vue";
    import Resume from "@/components/editor/resume/Resume.vue";

    const {getTemplate, setTemplate} = useTemplates();
    const {applyFonts} = useFonts();

    const {templateId} = defineProps<{
        templateId: string
    }>();

    const frequency = usePersistentRef<number>('autosave-period', 0);

    const {reference: template, status, saveValue} = useAutosave<ResumeTemplate | undefined>(await loadTemplate(), frequency, saveTemplate);

    async function loadTemplate(): Promise<ResumeTemplate | undefined> {
        const loadedTemplate: ResumeTemplate | undefined = await getTemplate(templateId);

        if (loadedTemplate) {
            applyFonts(loadedTemplate.fonts);
        }

        return loadedTemplate;
    }

    async function saveTemplate(template: ResumeTemplate | undefined) {
        if (!template) {
            return;
        }

        await setTemplate(template);
    }

    provide('autosave', {
        saveValue,
        frequency
    });
</script>

<template>
    <div v-if="template" class="flex grow">
        <div class="relative w-[440px] grid print:hidden">
            <div class="absolute inset-0">
                <editor-sidebar v-model="template" :save-state="status"/>
            </div>
        </div>

        <div class="relative grow">
            <resume
                v-model="template"
                class="absolute inset-0 scrollbar overflow-y-scroll overflow-x-clip print:relative print:h-full"
                editable
            />
        </div>
    </div>
</template>