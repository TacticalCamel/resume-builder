import LanguageSection from "@/components/editor/resume/sections/LanguageSection.vue";
import { ISection } from "@/models/resume/Resume";

export class Language{
    name: string
    level: string

    constructor() {
        this.name = '';
        this.level = '';
    }

    static get draggableCategory(): string {
        return Language.name;
    }
}

export class LanguageList implements ISection{
    title: string
    elements: Language[]

    constructor() {
        this.title = "Languages";
        this.elements = [];
    }

    get component() {
        return LanguageSection;
    }
}
