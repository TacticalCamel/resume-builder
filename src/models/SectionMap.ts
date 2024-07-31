import { Component } from "vue";
import EducationSection from "@/components/editor/sections/EducationSection.vue";
import ExperienceSection from "@/components/editor/sections/ExperienceSection.vue";
import SkillSection from "@/components/editor/sections/SkillSection.vue";
import LanguageSection from "@/components/editor/sections/LanguageSection.vue";
import ProjectSection from "@/components/editor/sections/ProjectSection.vue";

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