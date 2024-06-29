import type Section from "@/models/Section";
import type Education from "@/models/elements/Education";

export default interface EducationSection extends Section<Education> {
    title: string
    elements: Education[]
}