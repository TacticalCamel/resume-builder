import Section from "@/models/sections/Section";
import Project from "@/models/elements/Project";

export default interface ProjectSection extends Section<Project>{
    title: string
    elements: Project[]
    disclaimer: string
}