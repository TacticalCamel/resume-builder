import { Component } from "vue";
import EducationSection from "@/components/editor/resume/EducationSection.vue";
import ExperienceSection from "@/components/editor/resume/ExperienceSection.vue";
import SkillSection from "@/components/editor/resume/SkillSection.vue";
import LanguageSection from "@/components/editor/resume/LanguageSection.vue";
import ProjectSection from "@/components/editor/resume/ProjectSection.vue";

export interface SectionMap {
    educations: Component
    experiences: Component
    skills: Component
    languages: Component
    projects: Component
}

export const sectionComponents: SectionMap = {
    educations: EducationSection,
    experiences: ExperienceSection,
    skills: SkillSection,
    languages: LanguageSection,
    projects: ProjectSection
};