<script setup async lang="ts">
    import { ref } from "vue";
    import { useTemplates } from "@/composables/Templates";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import EditorSidebar from "@/components/editor/sidebar/EditorSidebar.vue";
    import Resume from "@/components/editor/resume/Resume.vue";
    import { useFonts } from "@/composables/Fonts";

    const {getTemplate} = useTemplates();
    const {applyFonts} = useFonts();

    const {templateId} = defineProps<{
        templateId: string
    }>();

    const template = ref<ResumeTemplate | undefined>(await loadTemplate());

    async function loadTemplate(): Promise<ResumeTemplate | undefined> {
        const loadedTemplate: ResumeTemplate | undefined = await getTemplate(templateId);

        if(loadedTemplate) {
            applyFonts(loadedTemplate.fonts);
        }

        return loadedTemplate;
    }
</script>

<template>
    <div v-if="template" class="flex grow">
        <div class="relative w-[440px] print:hidden">
            <div class="absolute inset-0">
                <editor-sidebar v-model="template"/>
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