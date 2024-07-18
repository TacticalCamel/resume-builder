import Section from "@/models/sections/Section";
import Language from "@/models/elements/Language";

export default interface LanguageSection extends Section<Language>{
    title: string
    elements: Language[]
}
