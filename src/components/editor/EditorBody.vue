<script setup async lang="ts">
    import { onMounted, onUnmounted, provide, ref } from "vue";
    import { autosaveInjectorKey } from "@/keys";
    import { applyFont, unloadFont } from "@/functions/Fonts";
    import { useTemplates } from "@/composables/useTemplates";
    import { useAutoSave } from "@/composables/useAutoSave";
    import { usePersistentRef } from "@/composables/usePersistentRef";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import EditorSidebar from "@/components/editor/sidebar/EditorSidebar.vue";
    import Resume from "@/components/editor/resume/Resume.vue";

    const {getTemplate, setTemplate, getEmptyTemplate, fallbackId} = useTemplates();

    const {templateId} = defineProps<{
        templateId: string
    }>();

    const emits = defineEmits<{
        change: [id: string | undefined]
    }>();

    const frequency = usePersistentRef<number>('autosave-period', 0);
    const template = ref<ResumeTemplate>(await loadTemplate());

    const {state, save} = useAutoSave<ResumeTemplate | undefined>(template, frequency, saveTemplate);

    async function loadTemplate(): Promise<ResumeTemplate> {
        // loading an empty template
        if(templateId === fallbackId) {
            const emptyTemplate: ResumeTemplate = await getEmptyTemplate();

            emits('change', emptyTemplate.id);

            return emptyTemplate;
        }

        const loadedTemplate: ResumeTemplate | undefined = await getTemplate(templateId);

        // loading failed, unset the id
        if (!loadedTemplate) {
            emits('change', undefined);
        }

        // value should never be undefined
        // the event emitted above should cause the parent not to render this component
        return loadedTemplate ?? await getEmptyTemplate();
    }

    async function saveTemplate(template: ResumeTemplate | undefined) {
        if (!template) {
            return;
        }

        // TODO: intentional delay to see loading state, remove later
        await new Promise(resolve => setTimeout(resolve, 500));

        await setTemplate(template);
    }

    provide(autosaveInjectorKey, {
        save,
        frequency,
        state
    });

    onMounted(() => {
        for (const font of template.value.fonts) {
            applyFont(font);
        }
    });

    onUnmounted(() => {
        for (const font of template.value.fonts) {
            unloadFont(font);
        }
    });
</script>

<template>
    <div class="flex grow">
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