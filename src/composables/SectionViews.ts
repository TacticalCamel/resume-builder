import { Component } from "vue";
import { SectionType } from "@/models/resume/Resume";
import EducationSection from "@/components/editor/resume/sections/EducationSection.vue";
import ExperienceSection from "@/components/editor/resume/sections/ExperienceSection.vue";
import SkillSection from "@/components/editor/resume/sections/SkillSection.vue";
import LanguageSection from "@/components/editor/resume/sections/LanguageSection.vue";
import ProjectSection from "@/components/editor/resume/sections/ProjectSection.vue";

export function useSectionViews() {
    function getSectionView(type: SectionType): SectionView {
        return sectionViews[type];
    }

    function getSectionViews(): [SectionType, SectionView][] {
        return Object.entries(sectionViews).map(([key, view]) => [Number(key) as SectionType, view]);
    }

    return {getSectionView, getSectionViews};
}

export interface SectionView {
    component: Component,
    name: string
}

const sectionViews: Record<SectionType, SectionView> = {
    [SectionType.educations]: {
        component: EducationSection,
        name: 'Educations'
    },
    [SectionType.experiences]: {
        component: ExperienceSection,
        name: 'Experiences'
    },
    [SectionType.skills]: {
        component: SkillSection,
        name: 'Skills'
    },
    [SectionType.languages]: {
        component: LanguageSection,
        name: 'Languages'
    },
    [SectionType.projects]: {
        component: ProjectSection,
        name: 'Projects'
    }
};