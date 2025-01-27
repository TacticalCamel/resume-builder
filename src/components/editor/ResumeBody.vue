<script setup lang="ts">
    import { ResumeModel, Section, SectionType } from "@/models/resume/Resume";
    import DraggableList from "@/components/editor/DraggableList.vue";
    import ResumeHeader from "@/components/editor/ResumeHeader.vue";
    import ResumeSectionEducations from "@/components/editor/ResumeSectionEducations.vue";
    import ResumeSectionExperiences from "@/components/editor/ResumeSectionExperiences.vue";
    import ResumeSectionSkills from "@/components/editor/ResumeSectionSkills.vue";
    import ResumeSectionLanguages from "@/components/editor/ResumeSectionLanguages.vue";
    import ResumeSectionProjects from "@/components/editor/ResumeSectionProjects.vue";

    const resume = defineModel<ResumeModel>({
        required: true
    });

    function getSectionComponent(type: SectionType) {
        switch (type) {
            case SectionType.educations:
                return ResumeSectionEducations;
            case SectionType.experiences:
                return ResumeSectionExperiences;
            case SectionType.skills:
                return ResumeSectionSkills;
            case SectionType.languages:
                return ResumeSectionLanguages;
            case SectionType.projects:
                return ResumeSectionProjects;
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
            <resume-header v-model="resume.header"/>
        </template>

        <template #item="{element: section, index}: {element: Section, index: number}">
            <component :is="getSectionComponent(section.type)" v-model="resume.sections[index]"/>
        </template>

        <template #empty>
            <span class="py-12">Drag sections here</span>
        </template>
    </draggable-list>
</template>