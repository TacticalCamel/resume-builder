import { Section } from "@/models/resume/Resume";
import { UniqueId } from "@/models/UniqueId";

export interface Skill extends UniqueId {
    name: string
    level: number
}

export interface SkillCategory extends UniqueId {
    title: string
    elements: Skill[]
    maxLevel: number
}

export interface SkillList extends Section<SkillCategory> {
}