<script setup lang="ts">
    import draggable from "vuedraggable";
    import HeaderSection from "@/components/sections/HeaderSection.vue";
    import { sectionComponents, type SectionMap } from "@/data/SectionMap";
    import { checkGroupMatch } from "@/models/BuildingBlock";
    import { settings } from "@/main";
    import ResumeModel, { getEmptyResume } from "@/models/ResumeModel";
    import Settings from "@/components/settings/Settings.vue";
    import AutosaveService from "@/services/AutosaveService";

    const resume = new AutosaveService<ResumeModel | null>('resume', createDefaultResume, {deep: true});

    function createDefaultResume(): ResumeModel | null {
        const params: URLSearchParams = new URLSearchParams(window.location.search);

        if(params.get('init')){
            params.delete('init');
            window.location.search = params.toString();

            return getEmptyResume();
        }

        return null;
    }
</script>

<template>
    <div class="relative resume-root py-10 px-3" :class="{'open': settings.settingsOpen}">
        <div :class="{'monochrome': settings.monochrome}">
            <transition-group v-if="resume.value">
                <draggable
                    v-model="resume.value.sections"
                    item-key="id"
                    key="draggable"
                    class="grid max-w-[960px] mx-auto"
                    :disabled="!settings.editable"
                    :group="{name: 'section', pull: true, put: checkGroupMatch}"
                    drag-class="dragging"
                    ghost-class="ghost"
                    animation="200"
                >
                    <template #header>
                        <header>
                            <header-section v-model="resume.value.header"/>
                        </header>
                    </template>
                    <template #item="{element: key}: {element: keyof SectionMap}">
                        <section class="rounded-lg">
                            <component :is="sectionComponents[key]" v-model="resume.value[key]" :id="`section-${key}`" class="max-w-[720px] mx-auto"/>
                        </section>
                    </template>
                </draggable>
            </transition-group>
        </div>

        <settings v-model:resume="resume.value"/>
    </div>
</template>

<style scoped>
    header {
        padding-bottom: 4.5rem;
        margin-bottom: 0.5rem;
    }

    section:not(:last-child) > * {
        padding-bottom: 1.25rem;
        margin-bottom: 0.5rem;
    }

    section:not(:first-child) > * {
        padding-top: 1.25rem;
    }

    .resume-root {
        transition: margin-right 150ms;
    }

    @media only screen and (max-width: 1536px) {
        .resume-root.open {
            margin-right: 23rem;
        }
    }

    @media only screen and (max-width: 1088px) {
        .resume-root.open {
            margin-right: 0;
        }
    }
</style>