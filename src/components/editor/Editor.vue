<script setup lang="ts">
    import { onBeforeMount, ref } from "vue";
    import { useNavigation } from "@/composables/Navigation";
    import { useTemplateService } from "@/composables/TemplateService";
    import { useThemes } from "@/composables/Themes";
    import { usePersistentRef } from "@/composables/PersistentRef";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import EditorSidebar from "@/components/editor/sidebar/EditorSidebar.vue";
    import FadeTransition from "@/components/shared/FadeTransition.vue";
    import ResumeFrame from "@/components/editor/resume/ResumeFrame.vue";

    const {navigateTo} = useNavigation();
    const {defaultLightTheme} = useThemes();
    const templateService = useTemplateService();

    const {routeParameters} = defineProps<{
        routeParameters: any
    }>();

    const template = usePersistentRef<ResumeTemplate | undefined>('template', undefined);

    const loadedId = ref<string | undefined>(undefined);

    onBeforeMount(() => {
        const load: any = routeParameters.load;
        const init: any = routeParameters.init;

        if (init && !template.value) {
            createEmptyResume();
            return;
        }

        if (load && typeof load === 'string') {
            if (template.value && template.value.id === load) {
                return;
            }

            loadedId.value = load;

            if (!template.value) {
                confirmLoad();
            }
        }
    });

    async function confirmLoad() {
        if (!loadedId.value) {
            return;
        }

        const loadedTemplate: ResumeTemplate | undefined = await templateService.getById(loadedId.value);

        if (!loadedTemplate) {
            console.error(`Template with id '${loadedId.value}' was not found`)
        } else {
            template.value = loadedTemplate;
        }

        loadedId.value = undefined;
    }

    function cancelLoad() {
        loadedId.value = undefined;
    }

    function createEmptyResume() {
        template.value = getEmptyResume();
    }

    function getEmptyResume() {
        return {
            id: crypto.randomUUID(),
            currentTheme: defaultLightTheme.id,
            currentFont: 'Inter',
            resume: {
                header: {
                    picture: undefined,
                    name: '',
                    profession: '',
                    description: '',
                    contacts: []
                },
                sections: []
            },
            themes: [],
            fonts: [{name: 'Inter', system: 0, data: undefined}],
            filters: {
                grayscale: 0,
                contrast: 100,
                brightness: 100
            }
        };
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
                    <div v-if="loadedId" class="absolute inset-0 bg-background/60 z-10 flex flex-col justify-center items-center backdrop-blur-sm">
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

                <resume-frame
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
                    <button @click="createEmptyResume()" class="flex justify-center items-center gap-2 px-2 py-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors text-secondary">Create a new one</button>
                    <span>or</span>
                    <button @click="navigateTo('/templates')" class="flex justify-center items-center gap-2 px-2 py-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors text-secondary">Browse
                        templates
                    </button>
                </div>
            </div>
        </div>
    </fade-transition>
</template>