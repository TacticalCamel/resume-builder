import { Section } from "@/models/resume/Resume";
import { Technology } from "@/models/resume/Technologies";
import { UniqueId } from "@/models/UniqueId";

export interface Project extends UniqueId {
    description: string
    url: string
    technologies: Technology[]
}

export interface ProjectList extends Section<Project> {
    disclaimer: string
}