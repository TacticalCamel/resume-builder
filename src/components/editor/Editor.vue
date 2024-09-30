<script setup lang="ts">
    import { ref, onBeforeMount } from "vue";
    import { useNavigation } from "@/composables/Navigation";
    import { useTemplateService } from "@/composables/TemplateService";
    import { usePersistentRef } from "@/composables/PersistentRef";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import EditorSidebar from "@/components/editor/sidebar/EditorSidebar.vue";
    import FadeTransition from "@/components/shared/transition/FadeTransition.vue";
    import Resume from "@/components/editor/resume/Resume.vue";

    const {navigateTo} = useNavigation();
    const templateService = useTemplateService();

    const {routeParameters} = defineProps<{
        routeParameters: any
    }>();

    // the id of the currently displayed template in the editor, undefined if empty
    // persist between page reloads and sessions
    const activeTemplateId = usePersistentRef<string | undefined>('active-template', undefined);

    // the id of the template that is attempting to load, undefined if there is no loading action
    // need to declare this separately from the current id, since we need a dialog to confirm or cancel overriding the current template that may not be saved
    const loadingTemplateId = ref<string | undefined>(undefined);

    // the currently displayed template
    // not a computed property because of its async update function
    const template = ref<ResumeTemplate | undefined>(undefined);

    onBeforeMount(() => {
        // attempt to load a new template with this id
        const load: string | undefined = typeof routeParameters.load === 'string' ? routeParameters.load : undefined;

        // initialize a default template when there is none loaded
        const init: boolean | undefined = typeof routeParameters.init === 'boolean' ? routeParameters.init : undefined;

        if (load) {
            // current id matches the loaded one, nothing to do
            if (activeTemplateId.value === load) {
                return;
            }

            loadingTemplateId.value = load;

            // skip confirmation dialog if no template was present previously
            if (!activeTemplateId.value) {
                confirmLoad();
            }
        }

        // initialize only when load is not specified
        else if (init && !activeTemplateId.value) {
            setEmptyTemplate();
        }

        // no special action, load current template
        else {
            updateTemplate();
        }
    });

    function setEmptyTemplate(): void {
        activeTemplateId.value = 'empty';

        updateTemplate();
    }

    function confirmLoad(): void {
        if (!loadingTemplateId.value) {
            return;
        }

        activeTemplateId.value = loadingTemplateId.value;
        loadingTemplateId.value = undefined;

        updateTemplate();
    }

    function cancelLoad(): void {
        loadingTemplateId.value = undefined;
    }

    async function updateTemplate(): Promise<void> {
        if (!activeTemplateId.value) {
            return;
        }

        const resultTemplate: ResumeTemplate | undefined = await templateService.getById(activeTemplateId.value);

        if (!resultTemplate) {
            console.error(`Template with id '${activeTemplateId.value}' was not found`)
        } else {
            template.value = resultTemplate;
        }
    }
</script>

<template>
    <fade-transition>
        <div v-if="template" class="flex grow">
            <div class="relative w-[440px] print:hidden">
                <div class="absolute inset-0">
                    <editor-sidebar v-model:template="template"/>
                </div>
            </div>

            <div class="relative grow">
                <fade-transition>
                    <div v-if="loadingTemplateId" class="absolute inset-0 bg-background/60 z-10 flex flex-col justify-center items-center backdrop-blur-sm">
                        <div class="bg-background px-12 py-8 rounded-lg border-2 border-foreground/30 font-medium">
                            <div class="text-center mb-6">
                                <div>There is already a resume loaded.</div>
                                <div>Do you want to replace it?</div>
                            </div>
                            <div class="flex justify-center gap-8 text-sm">
                                <button @click="confirmLoad()" class="w-28 flex justify-center items-center gap-2 p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors text-secondary">Replace</button>
                                <button @click="cancelLoad()" class="w-28 flex justify-center items-center gap-2 p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors text-error">Cancel</button>
                            </div>
                        </div>
                    </div>
                </fade-transition>

                <resume
                    v-model="template"
                    class="absolute inset-0 scrollbar overflow-y-scroll overflow-x-clip print:relative print:h-full"
                    editable
                />
            </div>
        </div>

        <div v-else class="absolute inset-0 flex flex-col justify-center items-center">
            <div class="bg-background px-12 py-8 rounded-lg border-2 border-foreground/30 font-medium">
                <div class="text-center mb-6">
                    <div>There is no resume loaded.</div>
                </div>
                <div class="flex items-center gap-4 text-sm text-nowrap">
                    <button @click="setEmptyTemplate()" class="flex justify-center items-center gap-2 px-2 py-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors text-secondary">Create a new one</button>
                    <span>or</span>
                    <button @click="navigateTo('/templates')" class="flex justify-center items-center gap-2 px-2 py-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors text-secondary">Browse
                        templates
                    </button>
                </div>
            </div>
        </div>
    </fade-transition>
</template>