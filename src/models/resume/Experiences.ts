import ISection from "@/models/interfaces/ISection";
import ExperienceSection from "@/components/editor/resume/ExperienceSection.vue";

export class Experience {
    company: string
    position: string
    start: string
    finish: string
    description: string
    stack: string[]

    constructor() {
        this.company = '';
        this.position = '';
        this.start = '';
        this.finish = '';
        this.description = '';
        this.stack = [];
    }

    static get draggableCategory(): string {
        return Experience.name;
    }
}

export class ExperienceList implements ISection {
    title: string
    elements: Experience[]

    constructor() {
        this.title = "Experiences";
        this.elements = [];
    }

    get component() {
        return ExperienceSection;
    }
}