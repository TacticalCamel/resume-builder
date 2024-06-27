import type {SectionKey} from "@/models/sections/Section";
import type HeaderSection from "@/models/sections/HeaderSection";
import type EducationSection from "@/models/sections/EducationSection";
import type ExperienceSection from "@/models/sections/ExperienceSection";
import type SkillSection from "@/models/sections/SkillSection";
import type LanguageSection from "@/models/sections/LanguageSection";
import type ProjectSection from "@/models/sections/ProjectSection";

export default interface Template {
    header: HeaderSection
    education: EducationSection
    experience: ExperienceSection
    skills: SkillSection
    languages: LanguageSection
    projects: ProjectSection
    sections: SectionKey[]
}

export function createExampleTemplate(): Template {
    return {
        header: {
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
            elements: [],
        },
        experience: {
            title: 'Experience',
            elements: [],
        },
        skills: {
            title: 'Skills',
            elements: [],
        },
        languages: {
            title: 'Languages',
            elements: [],
        },
        projects: {
            title: 'Projects',
            elements: [],
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