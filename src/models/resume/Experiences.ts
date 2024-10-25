import { Section } from "@/models/resume/Resume";
import { Technology } from "@/models/resume/Technologies";
import { UniqueId } from "@/models/UniqueId";

export interface Experience extends UniqueId {
    company: string
    position: string
    start: string
    finish: string
    description: string
    stack: Technology[]
}

export interface ExperienceList extends Section<Experience> {
}