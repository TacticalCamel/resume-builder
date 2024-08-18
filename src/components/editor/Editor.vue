<script setup lang="ts">
    import ResumeModel, { getEmptyResume } from "@/models/ResumeModel";
    import LocalStorageAutosaveService from "@/services/LocalStorageAutosaveService";
    import Resume from "@/components/editor/resume/Resume.vue";
    import EditorSidebar from "@/components/editor/sidebar/EditorSidebar.vue";
    import { settings } from "@/main";
    import { computed } from "vue";

    const props = defineProps({
        routeParameters: {
            type: Object,
            required: false,
            default: {}
        }
    });

    const model = new LocalStorageAutosaveService<ResumeModel | null>('resume', createDefaultResume, {deep: true});

    function createDefaultResume(): ResumeModel | null {
        return props.routeParameters.init ? getEmptyResume() : null;
    }

    const resumeStyle = computed(() => {
        return {
            filter: `grayscale(${settings.filters.grayscale}%) contrast(${settings.filters.contrast}%) brightness(${settings.filters.brightness}%)`,
            backdropFilter: `grayscale(${settings.filters.grayscale}%)`,
        };
    });
</script>

<template>
    <div class="flex grow">
        <div class="relative w-[440px] no-print">
            <div class="absolute inset-0">
                <editor-sidebar v-model="model.value"/>
            </div>
        </div>

        <div class="relative grow">
            <div class="absolute inset-0 scrollbar overflow-y-scroll overflow-x-clip" id="editor-content" :style="resumeStyle">
                <resume v-if="model.value" v-model="model.value" editable/>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #editor-content {
        font-family: var(--font-family), sans-serif !important;
    }
</style>