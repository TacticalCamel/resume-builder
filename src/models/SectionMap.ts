import { Component } from "vue";
import EducationSection from "@/components/resume/EducationSection.vue";
import ExperienceSection from "@/components/resume/ExperienceSection.vue";
import SkillSection from "@/components/resume/SkillSection.vue";
import LanguageSection from "@/components/resume/LanguageSection.vue";
import ProjectSection from "@/components/resume/ProjectSection.vue";

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