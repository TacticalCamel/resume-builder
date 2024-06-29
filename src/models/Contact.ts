import type {Component} from "vue";

export default interface Contact {
    icon: Component
    link: (value: string) => string | undefined
}

export interface ContactMap{
    email: Contact
    phone: Contact
    github: Contact
    location: Contact
}

export type ContactKey = keyof ContactMap;