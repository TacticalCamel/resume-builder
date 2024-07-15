import type {SectionKey} from "@/models/sections/Section";
import type HeaderSection from "@/models/sections/HeaderSection";
import type EducationSection from "@/models/sections/EducationSection";
import type ExperienceSection from "@/models/sections/ExperienceSection";
import type SkillSection from "@/models/sections/SkillSection";
import type LanguageSection from "@/models/sections/LanguageSection";
import type ProjectSection from "@/models/sections/ProjectSection";

export default interface ResumeModel {
    header: HeaderSection
    education: EducationSection
    experience: ExperienceSection
    skills: SkillSection
    languages: LanguageSection
    projects: ProjectSection
    sections: SectionKey[]
}

export function getExampleResume(): ResumeModel {
    return {
        header: {
            picture: null,
            name: 'Firstname Lastname',
            profession: 'Profession',
            contacts: [
                'email',
                'phone',
                'github',
                'location',
                'linkedin'
            ],
            email: 'firstname.lastname@gmail.com',
            phone: '+1234567890',
            location: 'City, Country',
            description: 'The Industrial Revolution and its consequences have been a disaster for the human race. They have greatly increased the life-expectancy of those of us who live in “advanced” countries, but they have destabilized society, have made life unfulfilling, have subjected human beings to indignities, have led to widespread psychological suffering.',
            github: 'https://github.com/example',
            linkedin: 'https://linkedin.com/in/example'
        },
        education: {
            title: 'Education',
            elements: [
                {
                    school: 'University of Example',
                    major: 'Example Engineering',
                    start: '2015',
                    finish: '2019'
                },
                {
                    school: 'University of Example',
                    major: 'Example Engineering',
                    start: '2019',
                    finish: '2021'
                }
            ],
        },
        experience: {
            title: 'Experience',
            elements: [
                {
                    company: 'Example Company',
                    position: 'Intern',
                    start: '2019',
                    finish: '2021',
                    description: 'Description of the experience: what I did, what I learned, etc.',
                    stack: ['Java', 'Spring Boot', 'React']
                }
            ],
        },
        skills: {
            title: 'Skills',
            elements: [
                {
                    title: 'Programming Languages',
                    elements: [
                        {
                            name: 'TypeScript',
                            level: 5,
                        },
                        {
                            name: 'Java',
                            level: 4,
                        },
                        {
                            name: 'Python',
                            level: 3,
                        },
                        {
                            name: 'C++',
                            level: 2,
                        },
                        {
                            name: 'Kotlin',
                            level: 1,
                        }
                    ],
                },
                {
                    title: 'Frameworks',
                    elements: [
                        {
                            name: 'Vue.js',
                            level: 5,
                        },
                        {
                            name: 'React',
                            level: 3,
                        },
                        {
                            name: 'Spring Boot',
                            level: 1,
                        }
                    ],
                }
            ],
        },
        languages: {
            title: 'Languages',
            elements: [
                {
                    name: 'English',
                    level: 'Native'
                },
                {
                    name: 'French',
                    level: 'Intermediate'
                },
                {
                    name: 'Spanish',
                    level: 'Beginner'
                }
            ],
        },
        projects: {
            title: 'Projects',
            elements: [
                {
                    url: 'https://www.github.com/example/project1',
                    description: 'Description of Project 1',
                    technologies: ['C', 'C++', 'Python'],
                },
                {
                    url: 'https://www.github.com/example/project2',
                    description: 'Description of Project 2',
                    technologies: ['Java', 'Kotlin', 'Spring Boot', 'React'],
                },
                {
                    url: 'https://www.github.com/example/project3',
                    description: 'Description of Project 3',
                    technologies: ['TypeScript', 'Vue.js', 'Tailwind CSS'],
                }
            ],
            disclaimer: 'Disclaimer about the projects.'
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

export function getEmptyResume(): ResumeModel {
    return {
        header: {
            picture: null,
            name: '',
            profession: '',
            contacts: [],
            email: '',
            phone: '',
            location: '',
            description: '',
            github: '',
            linkedin: ''
        },
        education: {
            title: 'Education',
            elements: []
        },
        experience: {
            title: 'Experience',
            elements: []
        },
        skills: {
            title: 'Skills',
            elements: []
        },
        languages: {
            title: 'Languages',
            elements: []
        },
        projects: {
            title: 'Projects',
            elements: [],
            disclaimer: ''
        },
        sections: []
    }
}