import { ResumeHeader } from "@/models/resume/Header";
import { UniqueId } from "@/models/UniqueId";

export interface ResumeModel extends UniqueId {
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

export interface Section<T = any> extends UniqueId {
    type: SectionType
    title: string
    elements: T[]
}