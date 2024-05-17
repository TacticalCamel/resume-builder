export interface Skill {
    name: string,
    level: number
}

export interface SkillCategory{
    name: string,
    skills: Skill[]
}
