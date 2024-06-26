export interface EducationSection {
    title: string
    educations: Education[]
}

export interface Education {
    school: string
    major: string
    start: string
    finish: string
}