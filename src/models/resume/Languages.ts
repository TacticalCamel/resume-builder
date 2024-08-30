import ISection from "@/models/interfaces/ISection";
import LanguageSection from "@/components/editor/resume/LanguageSection.vue";

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
