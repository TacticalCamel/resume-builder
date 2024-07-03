<script setup lang="ts">
    import {inject, type PropType} from "vue";
    import draggable from "vuedraggable";
    import HeaderSection from "@/components/sections/HeaderSection.vue";
    import type ResumeModel from "@/models/ResumeModel";
    import {type SectionKey, components} from "@/models/Section";
    import type SettingsModel from "@/models/SettingsModel";
    import {checkGroupMatch} from "@/models/BuildingBlock";

    const settings = inject<SettingsModel>('settings', {} as SettingsModel);

    const resume = defineModel({
        type: Object as PropType<ResumeModel>,
        required: true
    });
</script>

<template>
    <div class="resume-root py-10 px-3" :class="{'open': settings.settingsOpen}">
        <transition-group>
            <draggable
                v-model="resume.sections"
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
                        <header-section v-model="resume.header"/>
                    </header>
                </template>
                <template #item="{element: section}: {element: SectionKey}">
                    <section class="rounded-lg">
                        <component :is="components[section]" v-model="resume[section]" :id="`section-${section}`" class="max-w-[720px] mx-auto"/>
                    </section>
                </template>
            </draggable>
        </transition-group>
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

    @media only screen and (max-width: 1536px){
        .resume-root.open {
            margin-right: 23rem;
        }
    }

    @media only screen and (max-width: 1088px){
        .resume-root.open {
            margin-right: 0;
        }
    }
</style>