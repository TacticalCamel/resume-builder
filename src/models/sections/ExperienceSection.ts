import type Section from "@/models/sections/Section";
import type Experience from "@/models/elements/Experience";

export default interface ExperienceSection extends Section<Experience>{
    title: string
    elements: Experience[]
}