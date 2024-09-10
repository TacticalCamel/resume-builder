import { Section } from "@/models/resume/Resume";

export interface Experience {
    company: string
    position: string
    start: string
    finish: string
    description: string
    stack: string[]
}

export interface ExperienceList extends Section<Experience> {
    title: string
    elements: Experience[]
}