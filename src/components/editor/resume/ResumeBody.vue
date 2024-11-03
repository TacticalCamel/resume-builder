<script setup lang="ts">
    import { ResumeModel, Section, SectionType } from "@/models/resume/Resume";
    import HeaderSection from "@/components/editor/resume/sections/HeaderSection.vue";
    import DraggableList from "@/components/editor/resume/generic/DraggableList.vue";
    import EducationSection from "@/components/editor/resume/sections/EducationSection.vue";
    import ExperienceSection from "@/components/editor/resume/sections/ExperienceSection.vue";
    import SkillSection from "@/components/editor/resume/sections/SkillSection.vue";
    import LanguageSection from "@/components/editor/resume/sections/LanguageSection.vue";
    import ProjectSection from "@/components/editor/resume/sections/ProjectSection.vue";

    const resume = defineModel<ResumeModel>({
        required: true
    });

    function getSectionComponent(type: SectionType) {
        switch (type) {
            case SectionType.educations:
                return EducationSection;
            case SectionType.experiences:
                return ExperienceSection;
            case SectionType.skills:
                return SkillSection;
            case SectionType.languages:
                return LanguageSection;
            case SectionType.projects:
                return ProjectSection;
        }
    }
</script>

<template>
    <draggable-list
        v-model="resume.sections"
        group="section"
        class="grid max-w-[960px] mx-auto gap-12"
    >
        <template #header>
            <header-section v-model="resume.header"/>
        </template>

        <template #item="{element: section, index}: {element: Section, index: number}">
            <component :is="getSectionComponent(section.type)" v-model="resume.sections[index]"/>
        </template>

        <template #empty>
            <span class="py-12">Drag sections here</span>
        </template>
    </draggable-list>
</template>