<script setup async lang="ts">
    import { provide, ref } from "vue";
    import { useTemplates } from "@/composables/useTemplates";
    import { useAutoSave } from "@/composables/useAutoSave";
    import { usePersistentRef } from "@/composables/usePersistentRef";
    import { applyFonts } from "@/functions/Fonts";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import EditorSidebar from "@/components/editor/sidebar/EditorSidebar.vue";
    import Resume from "@/components/editor/resume/Resume.vue";

    const {getTemplate, setTemplate} = useTemplates();

    const {templateId} = defineProps<{
        templateId: string
    }>();

    const frequency = usePersistentRef<number>('autosave-period', 0);
    const template = ref<ResumeTemplate | undefined>(await loadTemplate());

    const {state, save} = useAutoSave<ResumeTemplate | undefined>(template, frequency, saveTemplate);

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

        // TODO: intentional delay to see loading state, remove later
        await new Promise(resolve => setTimeout(resolve, 500));

        await setTemplate(template);
    }

    provide('autosave', {
        save,
        frequency,
        state
    });
</script>

<template>
    <div v-if="template" class="flex grow">
        <div class="relative w-[440px] grid print:hidden">
            <div class="absolute inset-0">
                <editor-sidebar v-model="template" :save-state="state"/>
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