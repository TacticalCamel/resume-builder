<script setup lang="ts">
    import { computed } from "vue";
    import { useNavigationService } from "@/composables/NavigationService";
    import { useFontService } from "@/composables/FontService";
    import { useThemeService } from "@/composables/ThemeService";
    import { usePersistentRef } from "@/composables/PersistentRef";
    import { ResumeModel } from "@/models/resume/Resume";
    import EditorSettings from "@/models/EditorSettings";
    import Resume from "@/components/editor/resume/Resume.vue";
    import EditorSidebar from "@/components/editor/sidebar/EditorSidebar.vue";

    const fontService = useFontService();
    const navigationService = useNavigationService();
    const themeService = useThemeService();

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

    const resume = usePersistentRef<ResumeModel | null>('resume', () => {
        return routeParameters.init ? new ResumeModel() : null;
    }, ResumeModel.serializer);

    const editorStyles = computed(() => {
        return {
            filter: `grayscale(${settings.value.filters.grayscale}%) contrast(${settings.value.filters.contrast}%) brightness(${settings.value.filters.brightness}%)`,
            backdropFilter: `grayscale(${settings.value.filters.grayscale}%)`,
            fontFamily: fontService.currentFont,
            ...themeService.currentTheme.colors.reduce((previous, color) => ({...previous, [color.name]: color.value}), {})
        };
    });
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
                    <button @click="resume = new ResumeModel()" class="underline hover:text-secondary transition-colors">Create an empty resume</button>
                    <span class="text-xl text-foreground/70">or</span>
                    <button @click="navigationService.navigateTo('/templates')" class="underline hover:text-secondary transition-colors">Browse templates</button>
                </div>
            </div>
        </div>
    </div>
</template>