import ISection from "@/models/interfaces/ISection";
import SkillSection from "@/components/editor/resume/SkillSection.vue";

export class Skill {
    name: string
    level: number

    constructor() {
        this.name = '';
        this.level = 0;
    }
}

export class SkillList implements ISection {
    title: string
    elements: SkillCategory[]
    maxLevel: number

    constructor() {
        this.title = "Skills";
        this.elements = [];
        this.maxLevel = 5;
    }

    get component() {
        return SkillSection;
    }
}

export class SkillCategory{
    title: string
    elements: Skill[]

    constructor() {
        this.title = '';
        this.elements = [];
    }
}