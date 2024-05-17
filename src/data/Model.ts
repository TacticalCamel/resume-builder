import type PersonalInfo from "@/data/PersonalInfo";
import type {SkillCategory} from "@/data/Skills";
import type Education from "@/data/Education";
import type Language from "@/data/Language";
import type Project from "@/data/Project";

export default interface Model {
    personal: PersonalInfo,
    educations: Education[],
    skillCategories: SkillCategory[],
    languages: Language[],
    projects: Project[],
    projectsDisclaimer: string
}