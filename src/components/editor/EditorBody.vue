<script setup async lang="ts">
    import { onMounted, onUnmounted, ref } from "vue";
    import { loadFont, unloadFont } from "@/functions/Fonts";
    import { useTemplates } from "@/composables/useTemplates";
    import { useAutoSave } from "@/composables/useAutoSave";
    import { usePersistentRef } from "@/composables/usePersistentRef";
    import { provideSaveModel } from "@/functions/AutoSave";
    import { provideEditorModel } from "@/functions/Editor";
    import { TemplateModel } from "@/models/Template";
    import { EditorState } from "@/models/EditorState";
    import EditorSidebar from "@/components/editor/sidebar/EditorSidebar.vue";
    import Resume from "@/components/editor/resume/Resume.vue";

    const {templateId, setId} = defineProps<{
        templateId: string
        setId: (id: string | undefined) => void
    }>();

    const {getTemplate, setTemplate, getEmptyTemplate, fallbackId} = useTemplates();
    const template = ref<TemplateModel>(await loadTemplate());

    const frequency = usePersistentRef<number>('autosave-frequency', 0);
    const {state, save} = useAutoSave<TemplateModel | undefined>(template, frequency, saveTemplate);

    async function loadTemplate(): Promise<TemplateModel> {
        // loading an empty template
        if (templateId === fallbackId) {
            const emptyTemplate: TemplateModel = await getEmptyTemplate();

            setId(emptyTemplate.id);

            return emptyTemplate;
        }

        const loadedTemplate: TemplateModel | undefined = await getTemplate(templateId);

        // loading failed, unset the id
        if (!loadedTemplate) {
            setId(undefined);
        }

        // value should never be undefined
        // the event emitted above should cause the parent not to render this component
        return loadedTemplate ?? await getEmptyTemplate();
    }

    async function saveTemplate(template: TemplateModel | undefined) {
        if (!template) {
            return;
        }

        // TODO: intentional delay to see loading state, remove later
        await new Promise(resolve => setTimeout(resolve, 500));

        await setTemplate(template);
    }

    onMounted(() => {
        for (const font of template.value.fonts) {
            loadFont(font);
        }
    });

    onUnmounted(() => {
        for (const font of template.value.fonts) {
            unloadFont(font);
        }
    });

    provideSaveModel({
        frequency,
        state,
        save
    });

    provideEditorModel({
        editorState: ref(EditorState.edit),
        selectedElements: ref({
            ids: [],
            classes: []
        }),
        isGroupSelection: ref(false),
        highlightSelection: ref(true),
        loadTemplate: setId
    });
</script>

<template>
    <div class="flex grow">
        <div class="relative w-[440px] print:hidden">
            <editor-sidebar
                v-model="template"
                class="absolute inset-0 h-full"
            />
        </div>

        <div class="relative grow">
            <resume
                v-model="template"
                class="absolute inset-0 scrollbar overflow-y-scroll overflow-x-clip print:relative print:h-full"
            />
        </div>
    </div>
</template>