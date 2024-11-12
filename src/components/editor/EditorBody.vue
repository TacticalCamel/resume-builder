<script setup async lang="ts">
    import { onMounted, onUnmounted, ref } from "vue";
    import { loadFont, unloadFont } from "@/functions/Fonts";
    import { initializeEditor } from "@/composables/useEditor";
    import { useTemplates } from "@/composables/useTemplates";
    import { useAutosave } from "@/composables/useAutosave";
    import { useLocalstorageRef } from "@/composables/useLocalstorageRef";
    import { TemplateModel } from "@/models/Template";
    import { EditorMode } from "@/models/editor/EditorMode";
    import EditorSidebar from "@/components/editor/EditorSidebar.vue";
    import Resume from "@/components/editor/Resume.vue";

    const {templateId, setId} = defineProps<{
        // The id of the currently displayed template.
        templateId: string

        // Callback to modify templateId.
        setId: (id: string | undefined) => void
    }>();

    const {getTemplate, setTemplate, getEmptyTemplate, fallbackId} = useTemplates();

    /**
     * The currently displayed template as a reactive object.
     */
    const template = ref<TemplateModel>(await loadTemplate());

    /**
     * The frequency of template autosave in milliseconds.
     * This preference is not part of the template, but remembered by storing it in localstorage.
     */
    const frequency = useLocalstorageRef<number>('autosave-frequency', 0);

    /**
     * Set up template autosave.
     */
    const {state, save} = useAutosave(template, frequency, setTemplate);

    /**
     * Load a template from the database by id.
     * Has the side effect of calling setId in cases when the given id can not be loaded.
     */
    async function loadTemplate(): Promise<TemplateModel> {
        // special case: id matches the fallback id, need to load the empty preset
        if (templateId === fallbackId) {
            // initialize an empty template
            const emptyTemplate: TemplateModel = await getEmptyTemplate();

            // when loading a preset, it gets copied as a custom template, which now has a different id
            // calling setId informs the parent component that the displayed content id changed
            setId(emptyTemplate.id);

            return emptyTemplate;
        }

        // general case: load normally
        const loadedTemplate: TemplateModel | undefined = await getTemplate(templateId);

        // template does not exist, unset the id
        if (!loadedTemplate) {
            setId(undefined);

            // this value should never be used
            // unsetting the id should cause this component to not render
            return await getEmptyTemplate();
        }

        return loadedTemplate;
    }

    initializeEditor({
        mode: EditorMode.edit,
        load: setId,
        save: save,
        frequency,
        state,
    });

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
                class="absolute inset-0 scrollbar overflow-y-scroll overflow-x-clip print:relative"
            />
        </div>
    </div>
</template>