import ISection from "@/models/interfaces/ISection";
import EducationSection from "@/components/editor/resume/EducationSection.vue";

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