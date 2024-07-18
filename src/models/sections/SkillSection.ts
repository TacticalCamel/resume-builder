import Section from "@/models/sections/Section";
import SkillCategory from "@/models/elements/SkillCategory";

export default interface SkillSection extends Section<SkillCategory>{
    title: string
    elements: SkillCategory[]
}