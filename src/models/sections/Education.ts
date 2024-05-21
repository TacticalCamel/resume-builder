export interface EducationSection {
    title: string | null,
    educations: Education[]
}

export interface Education {
    school: string,
    major: string,
    start: string,
    finish: string
}