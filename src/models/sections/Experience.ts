export interface ExperienceSection {
    title: string
    experiences: Experience[]
}

export interface Experience {
    company: string
    position: string
    start: string
    finish: string
    description: string
    stack: string[]
}