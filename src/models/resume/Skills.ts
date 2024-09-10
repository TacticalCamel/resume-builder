import { Section } from "@/models/resume/Resume";

export interface Skill {
    name: string
    level: number
}

export interface SkillCategory{
    title: string
    elements: Skill[]
    maxLevel: number
}

export interface SkillList extends Section<SkillCategory> {
    title: string
    elements: SkillCategory[]
}