<script setup lang="ts">
    import { computed, onBeforeMount, ref } from "vue";
    import { useNavigationService } from "@/composables/NavigationService";
    import { useFontService } from "@/composables/FontService";
    import { useThemeService } from "@/composables/ThemeService";
    import { useTemplateService } from "@/composables/TemplateService";
    import { usePersistentRef } from "@/composables/PersistentRef";
    import { ResumeModel } from "@/models/resume/Resume";
    import { EditorSettings } from "@/models/EditorSettings";
    import Resume from "@/components/editor/resume/Resume.vue";
    import EditorSidebar from "@/components/editor/sidebar/EditorSidebar.vue";
    import FadeTransition from "@/components/shared/FadeTransition.vue";

    const fontService = useFontService();
    const navigationService = useNavigationService();
    const themeService = useThemeService();
    const templateService = useTemplateService();

    const {routeParameters} = defineProps<{
        routeParameters: any
    }>();

    const editorStyles = computed(() => {
        return {
            filter: `grayscale(${settings.value.filters.grayscale}%) contrast(${settings.value.filters.contrast}%) brightness(${settings.value.filters.brightness}%)`,
            backdropFilter: `grayscale(${settings.value.filters.grayscale}%)`,
            fontFamily: fontService.currentFont,
            ...themeService.currentTheme.colors.reduce((previous, color) => ({...previous, [color.name]: color.value}), {})
        };
    });

    const settings = usePersistentRef<EditorSettings>('settings', () => ({
        filters: {
            grayscale: 0,
            contrast: 100,
            brightness: 100
        }
    }));

    const resume = usePersistentRef<ResumeModel | undefined>('resume', undefined);

    const loadedId = ref<string | undefined>(undefined);

    onBeforeMount(() => {
        const load: any = routeParameters.load;
        const init: any = routeParameters.init;

        if(init && !resume.value) {
            createEmptyResume();
            return;
        }

        if (load && typeof load === 'string') {
            if(resume.value && resume.value.id === load) {
                return;
            }

            loadedId.value = load;

            if (!resume.value) {
                confirmLoad();
            }
        }
    });

    async function confirmLoad() {
        if (!loadedId.value) {
            return;
        }

        const loadedResume: ResumeModel | undefined = await templateService.getById(loadedId.value);

        if (!loadedResume) {
            console.error(`Resume with id '${loadedId.value}' was not found`)
        }
        else {
            resume.value = loadedResume;
        }

        loadedId.value = undefined;
    }

    function cancelLoad() {
        loadedId.value = undefined;
    }

    function createEmptyResume() {
        resume.value = getEmptyResume();
    }

    function getEmptyResume() {
        return {
            id: crypto.randomUUID(),
            header: {
                picture: undefined,
                name: '',
                profession: '',
                description: '',
                contacts: []
            },
            sections: []
        };
    }
</script>

<template>
    <div class="flex grow">
        <div class="relative w-[440px] print:hidden">
            <div class="absolute inset-0">
                <editor-sidebar v-model:resume="resume" v-model:settings="settings"/>
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

            <fade-transition>
                <div v-if="resume" class="absolute inset-0 scrollbar overflow-y-scroll overflow-x-clip bg-background text-foreground print:relative print:h-full" :style="editorStyles">
                    <resume v-model="resume" editable/>
                </div>

                <div v-else class="absolute inset-0 flex flex-col justify-center items-center">
                    <div class="bg-background px-12 py-8 rounded-lg border-2 border-foreground/30 font-medium">
                        <div class="text-center mb-6">
                            <div>There is no resume loaded.</div>
                        </div>
                        <div class="flex items-center gap-4 text-sm text-nowrap">
                            <button @click="createEmptyResume()" class="flex justify-center items-center gap-2 px-2 py-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors text-secondary">Create a new one</button>
                            <span>or</span>
                            <button @click="navigationService.navigateTo('/templates')" class="flex justify-center items-center gap-2 px-2 py-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors text-secondary">Browse templates</button>
                        </div>
                    </div>
                </div>
            </fade-transition>
        </div>

    </div>
</template>