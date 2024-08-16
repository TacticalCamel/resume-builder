import { Component } from "vue";
import IconEmail from "@/components/icons/IconEmail.vue";
import IconPhone from "@/components/icons/IconPhone.vue";
import IconGithub from "@/components/icons/IconGithub.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import IconLinkedIn from "@/components/icons/IconLinkedIn.vue";

export interface Contact {
    icon: Component
    placeholder: string
    createURL: (value: string) => string | undefined,
}

export interface ContactMap{
    email: Contact
    phone: Contact
    github: Contact
    location: Contact
    linkedin: Contact
}

export const contacts: ContactMap = {
    email: {
        icon: IconEmail,
        placeholder: 'Email address',
        createURL: (value: string): string => `mailto:${value}`
    },
    phone: {
        icon: IconPhone,
        placeholder: 'Phone number',
        createURL: (_: string) => undefined
    },
    github: {
        icon: IconGithub,
        placeholder: 'Github profile URL',
        createURL: (value: string) => value
    },
    location: {
        icon: IconLocation,
        placeholder: 'Physical location',
        createURL: (_: string) => undefined
    },
    linkedin: {
        icon: IconLinkedIn,
        placeholder: 'LinkedIn profile URL',
        createURL: (value: string) => value
    }
};