import ISection from "@/models/interfaces/ISection";
import ProjectSection from "@/components/editor/resume/ProjectSection.vue";

export class Project {
    description: string
    url: string
    technologies: string[]

    constructor() {
        this.description = '';
        this.url = '';
        this.technologies = [];
    }
}

export class ProjectList implements ISection{
    title: string
    elements: Project[]
    disclaimer: string

    constructor() {
        this.title = 'Projects';
        this.elements = [];
        this.disclaimer = '';
    }

    get component() {
        return ProjectSection;
    }
}