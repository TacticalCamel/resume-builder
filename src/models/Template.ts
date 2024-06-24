import type PersonalInfo from "@/models/PersonalInfo";
import type {SkillSection} from "@/models/sections/Skill";
import type {EducationSection} from "@/models/sections/Education";
import type {LanguageSection} from "@/models/sections/Language";
import type {ProjectSection} from "@/models/sections/Project";

export default interface Template {
    personal: PersonalInfo,
    education: EducationSection,
    skills: SkillSection,
    languages: LanguageSection,
    projects: ProjectSection
}

export function createExampleTemplate(): Template {
    return {
        personal: {
            picture: null,
            name: 'Firstname Lastname',
            profession: 'Profession',
            email: 'firstname.lastname@gmail.com',
            phone: '+1234567890',
            location: 'City, Country',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            github: 'https://github.com/example',
        },
        education: {
            title: 'Education',
            educations: [],
        },
        skills: {
            title: 'Skills',
            categories: [],
        },
        languages: {
            title: 'Languages',
            languages: [],
        },
        projects: {
            title: 'Projects',
            projects: [],
            disclaimer: 'Disclaimer'
        }
    }
}