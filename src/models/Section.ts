import type {Component} from "vue";

export interface SectionMap{
    education: Component
    experience: Component
    skills: Component
    languages: Component
    projects: Component
}

export type SectionKey = keyof SectionMap;