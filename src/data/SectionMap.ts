import { Component } from "vue";
import EducationSection from "@/components/sections/EducationSection.vue";
import ExperienceSection from "@/components/sections/ExperienceSection.vue";
import SkillSection from "@/components/sections/SkillSection.vue";
import LanguageSection from "@/components/sections/LanguageSection.vue";
import ProjectSection from "@/components/sections/ProjectSection.vue";

export interface SectionMap {
    education: Component
    experience: Component
    skills: Component
    languages: Component
    projects: Component
}

export const sectionComponents: SectionMap = {
    education: EducationSection,
    experience: ExperienceSection,
    skills: SkillSection,
    languages: LanguageSection,
    projects: ProjectSection
};