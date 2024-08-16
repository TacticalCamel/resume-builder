import { SectionMap } from "@/models/SectionMap";
import { ProjectList } from "@/components/editor/resume/ProjectSection.vue";
import { LanguageList } from "@/components/editor/resume/LanguageSection.vue";
import { SkillList } from "@/components/editor/resume/SkillSection.vue";
import { ExperienceList } from "@/components/editor/resume/ExperienceSection.vue";
import { EducationList } from "@/components/editor/resume/EducationSection.vue";
import { HeaderSectionModel } from "@/components/editor/resume/HeaderSection.vue";

export default interface ResumeModel {
    header: HeaderSectionModel
    educations: EducationList
    experiences: ExperienceList
    skills: SkillList
    languages: LanguageList
    projects: ProjectList
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