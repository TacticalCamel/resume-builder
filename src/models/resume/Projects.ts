import { Section } from "@/models/resume/Resume";
import { Technology } from "@/models/resume/Technologies";

export interface Project {
    description: string
    url: string
    technologies: Technology[]
}

export interface ProjectList extends Section<Project>{
    title: string
    elements: Project[]
    disclaimer: string
}