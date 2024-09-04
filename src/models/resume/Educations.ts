import EducationSection from "@/components/editor/resume/sections/EducationSection.vue";
import { ISection } from "@/models/resume/Resume";

export class Education {
    school: string
    major: string
    start: string
    finish: string

    constructor() {
        this.school = '';
        this.major = '';
        this.start = '';
        this.finish = '';
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