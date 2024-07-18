import Section from "@/models/sections/Section";
import Experience from "@/models/elements/Experience";

export default interface ExperienceSection extends Section<Experience>{
    title: string
    elements: Experience[]
}