export interface SkillSection{
    title: string
    categories: SkillCategory[]
}

export interface SkillCategory{
    name: string
    skills: Skill[]
}

export interface Skill {
    name: string
    level: number
}