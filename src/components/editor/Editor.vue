<script setup lang="ts">
    import { ref, onBeforeMount } from "vue";
    import { useNavigation } from "@/composables/useNavigation";
    import { usePersistentRef } from "@/composables/usePersistentRef";
    import { useTemplates } from "@/composables/useTemplates";
    import FadeTransition from "@/components/shared/transition/FadeTransition.vue";
    import EditorBody from "@/components/editor/EditorBody.vue";
    import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";

    const {navigateTo} = useNavigation();
    const {fallbackId} = useTemplates();

    const {routeParameters} = defineProps<{
        routeParameters: any
    }>();

    // the id of the currently displayed template in the editor, undefined if empty
    // persist between page reloads and sessions
    const activeTemplateId = usePersistentRef<string | undefined>('active-template', undefined);

    // the id of the template that is attempting to load, undefined if there is no loading action
    // need to declare this separately from the current id, since we need a dialog to confirm or cancel overriding the current template
    const loadingTemplateId = ref<string | undefined>(undefined);

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
            initializeEmpty();
        }
    });

    function initializeEmpty(): void {
        activeTemplateId.value = fallbackId;
    }

    function confirmLoad(): void {
        if (!loadingTemplateId.value) {
            return;
        }

        activeTemplateId.value = loadingTemplateId.value;
        loadingTemplateId.value = undefined;
    }

    function cancelLoad(): void {
        loadingTemplateId.value = undefined;
    }

    function setTemplateId(id: string | undefined): void {
        activeTemplateId.value = id;
    }
</script>

<template>
    <fade-transition>
        <div v-if="loadingTemplateId" class="flex grow bg-background/60 z-10 flex-col justify-center items-center">
            <div class="bg-background px-12 py-8 rounded-lg border-2 border-foreground/30 font-medium">
                <div class="text-center mb-6">
                    <div>There is already a template loaded.</div>
                    <div>Do you want to replace it?</div>
                </div>
                <div class="flex justify-center gap-8 text-sm">
                    <button @click="confirmLoad()" class="w-28 flex justify-center items-center gap-2 p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors text-secondary">Replace</button>
                    <button @click="cancelLoad()" class="w-28 flex justify-center items-center gap-2 p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors text-error">Cancel</button>
                </div>
            </div>
        </div>

        <div v-else-if="activeTemplateId" class="flex grow">
            <fade-transition>
                <suspense>
                    <editor-body
                        :template-id="activeTemplateId"
                        :set-id="setTemplateId"
                        :key="activeTemplateId"
                    />

                    <template #fallback>
                        <div class="flex flex-col gap-4 grow justify-center items-center">
                            <loading-spinner class="text-secondary"/>
                            <span class="text-lg font-medium ps-2">Loading...</span>
                        </div>
                    </template>
                </suspense>
            </fade-transition>
        </div>

        <div v-else class="absolute inset-0 flex flex-col justify-center items-center">
            <div class="bg-background px-12 py-8 rounded-lg border-2 border-foreground/30 font-medium">
                <div class="text-center mb-6">
                    <div>There is no template loaded.</div>
                </div>
                <div class="flex items-center gap-4 text-sm text-nowrap">
                    <button @click="initializeEmpty()" class="flex justify-center items-center gap-2 px-2 py-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors text-secondary">Create a new one</button>
                    <span>or</span>
                    <button @click="navigateTo('/templates')" class="flex justify-center items-center gap-2 px-2 py-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors text-secondary">Browse
                        templates
                    </button>
                </div>
            </div>
        </div>
    </fade-transition>
</template>