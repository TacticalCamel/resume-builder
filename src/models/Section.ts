import type {Component} from "vue";
import ProjectSection from "@/components/sections/ProjectSection.vue";
import LanguageSection from "@/components/sections/LanguageSection.vue";
import SkillSection from "@/components/sections/SkillSection.vue";
import ExperienceSection from "@/components/sections/ExperienceSection.vue";
import EducationSection from "@/components/sections/EducationSection.vue";

export default interface Section<T>{
    title: string
    elements: T[]
}

export interface SectionMap{
    education: Component
    experience: Component
    skills: Component
    languages: Component
    projects: Component
}

export type SectionKey = keyof SectionMap;

// a map to find each component by name
export const components: SectionMap = {
    education: EducationSection,
    experience: ExperienceSection,
    skills: SkillSection,
    languages: LanguageSection,
    projects: ProjectSection
};