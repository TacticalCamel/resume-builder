import Section from "@/models/sections/Section";
import Education from "@/models/elements/Education";

export default interface EducationSection extends Section<Education> {
    title: string
    elements: Education[]
}