import { Section } from "@/models/resume/Resume";
import { UniqueId } from "@/models/UniqueId";

export interface Education extends UniqueId {
    school: string
    major: string
    start: string
    finish: string
}

export interface EducationList extends Section<Education> {
}