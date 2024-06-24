export interface ProjectSection {
    title: string,
    disclaimer: string,
    projects: Project[]
}

export interface Project {
    description: string,
    url: string,
    technologies: string[]
}