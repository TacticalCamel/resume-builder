import { Section } from "@/models/resume/Resume";
import { UniqueId } from "@/models/UniqueId";

export interface Language extends UniqueId {
    name: string
    level: string
}

export interface LanguageList extends Section<Language> {
}