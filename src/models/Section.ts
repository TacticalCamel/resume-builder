import type {Component} from "vue";

export default interface Section<T>{
    title: string
    elements: T[]
}

export interface SectionMap{
    education: Component
    experience: Component
    skills: Component
    languages: Component
    projects: Component
}

export type SectionKey = keyof SectionMap;