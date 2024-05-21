export interface SkillSection{
    title: string | null,
    categories: SkillCategory[]
}

export interface SkillCategory{
    name: string,
    skills: Skill[]
}

export interface Skill {
    name: string,
    level: number
}