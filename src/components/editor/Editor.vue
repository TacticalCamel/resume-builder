<script setup lang="ts">
    import { computed, onBeforeMount } from "vue";
    import { useNavigationService } from "@/composables/NavigationService";
    import { useFontService } from "@/composables/FontService";
    import { useThemeService } from "@/composables/ThemeService";
    import { useTemplateService } from "@/composables/TemplateService";
    import { usePersistentRef } from "@/composables/PersistentRef";
    import { ResumeModel } from "@/models/resume/Resume";
    import { EditorSettings } from "@/models/EditorSettings";
    import Resume from "@/components/editor/resume/Resume.vue";
    import EditorSidebar from "@/components/editor/sidebar/EditorSidebar.vue";

    const fontService = useFontService();
    const navigationService = useNavigationService();
    const themeService = useThemeService();
    const templateService = useTemplateService();

    const {routeParameters} = defineProps<{
        routeParameters: any
    }>();

    const settings = usePersistentRef<EditorSettings>('settings', () => ({
        filters: {
            grayscale: 0,
            contrast: 100,
            brightness: 100
        },
        printing: {
            preview: false,
            scale: 100,
            orientation: 'Portrait',
            size: 'A4'
        }
    }));

    const resume = usePersistentRef<ResumeModel | undefined>('resume', undefined);

    const editorStyles = computed(() => {
        return {
            filter: `grayscale(${settings.value.filters.grayscale}%) contrast(${settings.value.filters.contrast}%) brightness(${settings.value.filters.brightness}%)`,
            backdropFilter: `grayscale(${settings.value.filters.grayscale}%)`,
            fontFamily: fontService.currentFont,
            ...themeService.currentTheme.colors.reduce((previous, color) => ({...previous, [color.name]: color.value}), {})
        };
    });

    onBeforeMount(() => {
        const loadId: any = routeParameters.load;

        if(loadId && typeof loadId === 'string') {
            console.log('load', loadId)
        }
    });

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
            <div id="editor" class="absolute inset-0 scrollbar overflow-y-scroll overflow-x-clip bg-background text-foreground print:relative" :style="editorStyles">
                <resume v-model="resume" v-if="resume" editable/>

                <div v-else class="flex flex-col size-full justify-center items-center gap-2 text-2xl">
                    <button @click="createEmptyResume" class="underline hover:text-secondary transition-colors">Create an empty resume</button>
                    <span class="text-xl text-foreground/70">or</span>
                    <button @click="navigationService.navigateTo('/templates')" class="underline hover:text-secondary transition-colors">Browse templates</button>
                </div>
            </div>

            <!--
            <div class="absolute inset-0 bg-background/80 z-10 flex justify-center items-center">

            </div>
            -->
        </div>

    </div>
</template>