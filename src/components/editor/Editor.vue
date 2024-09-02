<script setup lang="ts">
    import { computed } from "vue";
    import { fontService, navigationService, themeService } from "@/services";
    import LocalStorageAutosaveService from "@/services/implementations/LocalStorageAutosaveService";
    import Resume from "@/components/editor/resume/Resume.vue";
    import EditorSidebar from "@/components/editor/sidebar/EditorSidebar.vue";
    import EditorSettings from "@/models/EditorSettings";
    import { ResumeModel } from "@/models/resume/Resume";

    const props = defineProps({
        routeParameters: {
            type: Object,
            default: {}
        }
    });

    const settings = new LocalStorageAutosaveService<EditorSettings>('settings', () => ({
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

    const resume = new LocalStorageAutosaveService<ResumeModel | null>('resume', () => {
        return props.routeParameters.init ? new ResumeModel() : null;
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
        <div class="relative w-[440px]">
            <div class="absolute inset-0">
                <editor-sidebar v-model:resume="resume.value" v-model:settings="settings.value"/>
            </div>
        </div>

        <div class="relative grow">
            <div id="editor" class="absolute inset-0 scrollbar overflow-y-scroll overflow-x-clip bg-background text-foreground" :style="editorStyles">
                {{ fontService.currentFont }}

                <resume v-if="resume.value" v-model="resume.value" editable/>

                <div v-else class="flex flex-col size-full justify-center items-center gap-2 text-2xl">
                    <button @click="resume.value = new ResumeModel()" class="underline hover:text-secondary transition-colors">Create an empty resume</button>
                    <span class="text-xl text-foreground/70">or</span>
                    <button @click="navigationService.navigateTo('/templates')" class="underline hover:text-secondary transition-colors">Browse templates</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
    /*#editor {
        @apply fixed z-50 inset-0;
    }*/

    /*#editor::after {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        border: 1px solid red;
        height: 297mm;
        width: 210mm;
    }

    #editor > * {
        transform: scale(0.5);
        transform-origin: 50% 0;
    }

    @page {
        size: A4 portrait;
    }*/
</style>