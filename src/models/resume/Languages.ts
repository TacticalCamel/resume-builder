import { Section } from "@/models/resume/Resume";

export interface Language{
    name: string
    level: string
}

export interface LanguageList extends Section<Language>{
    title: string
    elements: Language[]
}