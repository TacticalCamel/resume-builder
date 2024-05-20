import type PersonalInfo from "@/models/PersonalInfo";
import type {SkillCategory} from "@/models/Skills";
import type Education from "@/models/Education";
import type Language from "@/models/Language";
import type Project from "@/models/Project";

export default interface Model {
    personal: PersonalInfo,
    educations: Education[],
    skillCategories: SkillCategory[],
    languages: Language[],
    projects: Project[],
    projectsDisclaimer: string
}