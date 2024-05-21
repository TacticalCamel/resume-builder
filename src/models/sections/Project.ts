export interface ProjectSection {
    title: string | null,
    disclaimer: string | null,
    projects: Project[]
}

export interface Project {
    description: string,
    url: string,
    technologies: string[]
}