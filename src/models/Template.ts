import type PersonalInfo from "@/models/PersonalInfo";
import type {SkillSection} from "@/models/Skill";
import type {EducationSection} from "@/models/Education";
import type {LanguageSection} from "@/models/Language";
import type {ProjectSection} from "@/models/Project";
import type {ExperienceSection} from "@/models/Experience";
import type {SectionKey} from "@/models/Section";

export default interface Template {
    personal: PersonalInfo
    education: EducationSection
    experience: ExperienceSection
    skills: SkillSection
    languages: LanguageSection
    projects: ProjectSection
    sections: SectionKey[]
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
            description: 'The Industrial Revolution and its consequences have been a disaster for the human race. They have greatly increased the life-expectancy of those of us who live in “advanced” countries, but they have destabilized society, have made life unfulfilling, have subjected human beings to indignities, have led to widespread psychological suffering.',
            github: 'https://github.com/example',
        },
        education: {
            title: 'Education',
            educations: [],
        },
        experience: {
            title: 'Experience',
            experiences: [],
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
        },
        sections: [
            'education',
            'experience',
            'skills',
            'languages',
            'projects'
        ]
    }
}