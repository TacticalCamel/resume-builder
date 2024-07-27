<script setup lang="ts">
    import ResumeModel, { getEmptyResume } from "@/models/ResumeModel";
    import AutosaveService from "@/services/AutosaveService";
    import Resume from "@/components/resume/Resume.vue";
    import Settings from "@/components/settings/Settings.vue";
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
    <div>
        <resume v-if="model.value" v-model="model.value" id="resume-root" :class="{'open': settings.settingsOpen, 'monochrome': settings.monochrome}"/>

        <div v-else class="empty m-auto mt-4 flex items-center">
            <div class="h-1/2 w-full rounded-lg border-2 border-dashed border-info">

            </div>
        </div>

        <settings v-model:resume="model.value"/>
    </div>
</template>

<style scoped>
    #resume-root {
        transition: margin-right 150ms;
    }

    @media only screen and (max-width: 1536px) {
        #resume-root.open {
            margin-right: 23rem;
        }
    }

    @media only screen and (max-width: 1088px) {
        #resume-root.open {
            margin-right: 0;
        }
    }

    .empty {
        max-width: 960px;
        height: calc(100vh - 6rem);
    }
</style>