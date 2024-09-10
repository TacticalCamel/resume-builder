import { Section } from "@/models/resume/Resume";

export interface Project {
    description: string
    url: string
    technologies: string[]
}

export interface ProjectList extends Section<Project>{
    title: string
    elements: Project[]
    disclaimer: string
}