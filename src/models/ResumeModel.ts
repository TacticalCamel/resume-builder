import HeaderSection from "@/models/sections/HeaderSection";
import EducationSection from "@/models/sections/EducationSection";
import ExperienceSection from "@/models/sections/ExperienceSection";
import SkillSection from "@/models/sections/SkillSection";
import LanguageSection from "@/models/sections/LanguageSection";
import ProjectSection from "@/models/sections/ProjectSection";
import { SectionMap } from "@/models/SectionMap";

export default interface ResumeModel {
    header: HeaderSection
    educations: EducationSection
    experiences: ExperienceSection
    skills: SkillSection
    languages: LanguageSection
    projects: ProjectSection
    sections: (keyof SectionMap)[]
}

export function getEmptyResume(): ResumeModel {
    return {
        header: {
            picture: null,
            name: "",
            profession: "",
            contacts: [
                "email",
                "phone",
                "github",
                "location",
                "linkedin"
            ],
            email: "",
            phone: "",
            location: "",
            description: "",
            github: "",
            linkedin: ""
        },
        educations: {
            title: "Education",
            elements: [
                {
                    school: "",
                    major: "",
                    start: "",
                    finish: ""
                }
            ]
        },
        experiences: {
            title: "Experience",
            elements: [
                {
                    company: "",
                    position: "",
                    start: "",
                    finish: "",
                    description: "",
                    stack: ["",
                        "",
                        ""
                    ]
                }
            ]
        },
        skills: {
            title: "Skills",
            elements: [
                {
                    title: "",
                    elements: [
                        {
                            name: "",
                            level: 5
                        },
                        {
                            name: "",
                            level: 4
                        },
                        {
                            name: "",
                            level: 3
                        }
                    ]
                },
                {
                    title: "",
                    elements: [
                        {
                            name: "",
                            level: 4
                        },
                        {
                            name: "",
                            level: 3
                        }
                    ]
                }
            ]
        },
        languages: {
            title: "Languages",
            elements: [
                {
                    name: "",

                    level: ""
                },
                {
                    name: "",
                    level: ""
                }
            ]
        },
        projects: {
            title: "Projects",
            elements: [
                {
                    url: "",

                    description: "",

                    technologies: ["",
                        ""]
                },
                {
                    url: "",

                    description: "",

                    technologies: ["",
                        "",
                        ""]
                }
            ],
            disclaimer: ""
        },
        sections: [
            "educations",
            "experiences",
            "skills",
            "languages",
            "projects"
        ]
    }
}