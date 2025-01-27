<script setup lang="ts">
    import { onBeforeMount, ref } from "vue";
    import { useNavigation } from "@/composables/useNavigation";
    import { useLocalstorageRef } from "@/composables/useLocalstorageRef";
    import { getFallbackId } from "@/functions/Templates";
    import EditorBody from "@/components/editor/EditorBody.vue";
    import TransitionFade from "@/components/shared/TransitionFade.vue";
    import IconLoading from "@/components/shared/IconLoading.vue";
    import InputButton from "@/components/shared/InputButton.vue";

    const {navigateTo, routeParameters} = useNavigation();

    /**
     * The id of the currently displayed template in the editor.
     * Undefined when no template is displayed.
     */
    const activeTemplateId = useLocalstorageRef<string | undefined>('active-template', undefined);

    /**
     * The id of the template that is attempting to load.
     * Undefined if there is no loading action.
     * Needed for the dialog to confirm or cancel overriding the active id.
     */
    const loadingTemplateId = ref<string | undefined>(undefined);

    /**
     * Resolve which template to display and load.
     */
    onBeforeMount(() => {
        // defined when loading a new template
        const load: string | undefined = typeof routeParameters.value.load === 'string' ? routeParameters.value.load : undefined;

        // defined when initializing a default template
        const init: boolean | undefined = typeof routeParameters.value.init === 'boolean' ? routeParameters.value.init : undefined;

        if (load) {
            // already loaded, do nothing
            if (activeTemplateId.value === load) {
                return;
            }

            loadingTemplateId.value = load;

            // no template will be overridden, confirm load dialog
            if (!activeTemplateId.value) {
                confirmLoading();
            }
        }

        // initialize when empty
        else if (init && !activeTemplateId.value) {
            setIdToFallback();
        }
    });

    /**
     * Set the active id to the one attempting to load.
     */
    function confirmLoading(): void {
        if (!loadingTemplateId.value) {
            return;
        }

        setTemplateId(loadingTemplateId.value);
        clearLoading();
    }

    /**
     * Cancel template loading.
     */
    function clearLoading(): void {
        loadingTemplateId.value = undefined;
    }

    /**
     * Set the active template id.
     * @param id The id of the template.
     */
    function setTemplateId(id: string | undefined): void {
        activeTemplateId.value = id;
    }

    /**
     * Set the active template id to the fallback value.
     */
    function setIdToFallback(): void {
        setTemplateId(getFallbackId());
    }
</script>

<template>
    <div v-if="activeTemplateId" class="flex grow">
        <!-- loading dialog -->
        <transition-fade>
            <div v-if="loadingTemplateId" @click="clearLoading()" class="absolute inset-0 flex justify-center items-center bg-black/50 z-20">
                <div @click.stop class="bg-background px-12 py-8 rounded-lg shadow-lg shadow-black">
                    <div class="text-center mb-6 font-medium">
                        <div>There is already a template loaded.</div>
                        <div>Do you want to replace it?</div>
                    </div>

                    <div class="grid grid-cols-2 gap-8 text-sm">
                        <input-button @click="confirmLoading()" class="text-secondary">Replace</input-button>
                        <input-button @click="clearLoading()" class="text-error">Cancel</input-button>
                    </div>
                </div>
            </div>
        </transition-fade>

        <!-- editor body -->
        <transition-fade>
            <suspense>
                <editor-body
                    :template-id="activeTemplateId"
                    :set-id="setTemplateId"
                    :key="activeTemplateId"
                />

                <template #fallback>
                    <div class="flex flex-col gap-4 grow justify-center items-center">
                        <icon-loading class="size-16 text-secondary"/>
                        <span class="text-lg font-medium ps-2">Loading...</span>
                    </div>
                </template>
            </suspense>
        </transition-fade>
    </div>

    <!-- empty dialog -->
    <div v-else class="flex grow justify-center items-center">
        <div class="bg-background px-12 py-8 rounded-lg border-2 border-foreground/30">
            <div class="text-center mb-6 font-medium">
                <div>There is no template loaded.</div>
            </div>

            <div class="flex items-center gap-4 text-sm">
                <input-button @click="setIdToFallback()" class="text-secondary">Create a new one</input-button>
                <span>or</span>
                <input-button @click="navigateTo('/templates')" class="text-secondary">Browse templates</input-button>
            </div>
        </div>
    </div>
</template>