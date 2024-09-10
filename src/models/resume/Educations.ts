import { Section } from "@/models/resume/Resume";

export interface Education {
    school: string
    major: string
    start: string
    finish: string
}

export interface EducationList extends Section<Education> {
    title: string
    elements: Education[]
}