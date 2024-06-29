<script setup lang="ts">
    import {inject, type PropType} from "vue";
    import draggable from "vuedraggable";
    import HeaderSection from "@/components/sections/HeaderSection.vue";
    import EducationSection from "@/components/sections/EducationSection.vue";
    import ExperienceSection from "@/components/sections/ExperienceSection.vue";
    import SkillSection from "@/components/sections/SkillSection.vue";
    import LanguageSection from "@/components/sections/LanguageSection.vue";
    import ProjectSection from "@/components/sections/ProjectSection.vue";
    import type ResumeModel from "@/models/ResumeModel";
    import type {SectionMap, SectionKey} from "@/models/Section";
    import type SettingsModel from "@/models/SettingsModel";

    const settings = inject<SettingsModel>('settings', {} as SettingsModel);

    // a map to find each component by name
    const components: SectionMap = {
        education: EducationSection,
        experience: ExperienceSection,
        skills: SkillSection,
        languages: LanguageSection,
        projects: ProjectSection
    };

    const resume = defineModel({
        type: Object as PropType<ResumeModel>,
        required: true
    });
</script>

<template>
    <div class="py-10 px-3 mobile:px-5 md:px-10">
        <transition-group>
            <draggable
                v-model="resume.sections"
                item-key="id"
                key="draggable"
                class="grid max-w-[960px] mx-auto"
                :disabled="!settings.editable"
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
</style>