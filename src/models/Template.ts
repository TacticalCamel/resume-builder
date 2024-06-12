import type PersonalInfo from "@/models/PersonalInfo";
import type {SkillSection} from "@/models/sections/Skill";
import type {EducationSection} from "@/models/sections/Education";
import type {LanguageSection} from "@/models/sections/Language";
import type {ProjectSection} from "@/models/sections/Project";

export default interface Template {
    personal: PersonalInfo | null,
    education: EducationSection | null,
    skills: SkillSection | null,
    languages: LanguageSection | null,
    projects: ProjectSection | null
}