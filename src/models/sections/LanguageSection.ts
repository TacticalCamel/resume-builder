import type Section from "@/models/sections/Section";
import type Language from "@/models/elements/Language";

export default interface LanguageSection extends Section<Language>{
    title: string
    elements: Language[]
}
