import type Section from "@/models/sections/Section";
import type SkillCategory from "@/models/elements/SkillCategory";

export default interface SkillSection extends Section<SkillCategory>{
    title: string
    elements: SkillCategory[]
}