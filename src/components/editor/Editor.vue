<script setup lang="ts">
    import ResumeModel, { getEmptyResume } from "@/models/ResumeModel";
    import AutosaveService from "@/services/AutosaveService";
    import Resume from "@/components/editor/Resume.vue";
    import EditorSidebar from "@/components/editor/EditorSidebar.vue";
    import { settings } from "@/main";

    const props = defineProps({
        routeParameters: {
            type: Object,
            required: false,
            default: {}
        }
    });

    const model = new AutosaveService<ResumeModel | null>('resume', createDefaultResume, {deep: true});

    function createDefaultResume(): ResumeModel | null {
        return props.routeParameters.init ? getEmptyResume() : null;
    }
</script>

<template>
    <div class="flex grow">
        <div class="relative w-[440px] no-print">
            <div class="absolute inset-0">
                <editor-sidebar
                    v-model:resume="model.value"
                />
            </div>
        </div>

        <div class="relative grow">
            <div class="absolute inset-0 scrollbar overflow-y-scroll overflow-x-clip" id="editor-content" :class="{'monochrome': settings.monochrome}">
                <resume
                    v-if="model.value"
                    v-model="model.value"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
    #editor-content {
        font-family: var(--font-family), sans-serif !important;
    }

    #editor-content.monochrome {
        filter: grayscale(100%);
        backdrop-filter: grayscale(100%);
    }
</style>