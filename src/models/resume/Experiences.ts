import { Section } from "@/models/resume/Resume";
import { Technology } from "@/models/resume/Technologies";

export interface Experience {
    company: string
    position: string
    start: string
    finish: string
    description: string
    stack: Technology[]
}

export interface ExperienceList extends Section<Experience> {
    title: string
    elements: Experience[]
}