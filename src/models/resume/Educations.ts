import ISection from "@/models/interfaces/ISection";
import EducationSection from "@/components/editor/resume/EducationSection.vue";
import IStyleable from "@/models/interfaces/IStyleable";

export class Education implements IStyleable {
    school: string
    major: string
    start: string
    finish: string
    style: CSSStyleDeclaration

    constructor() {
        this.school = '';
        this.major = '';
        this.start = '';
        this.finish = '';
        this.style = {} as CSSStyleDeclaration;
    }

    static get draggableCategory(): string {
        return Education.name;
    }
}

export class EducationList implements ISection {
    title: string
    elements: Education[]

    constructor() {
        this.title = 'Educations';
        this.elements = [];
    }

    get component() {
        return EducationSection;
    }
}