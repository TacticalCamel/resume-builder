import { ResumeHeader } from "@/models/resume/Header";

export interface ResumeModel {
    id: string
    header: ResumeHeader
    sections: Section[]
}

export enum SectionType {
    educations = 0,
    experiences = 1,
    skills = 2,
    languages = 3,
    projects = 4
}

export interface Section<T = any> {
    type: SectionType
    title: string
    elements: T[]
}