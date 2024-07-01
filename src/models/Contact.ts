import type {Component} from "vue";
import IconEmail from "@/components/icons/contacts/IconEmail.vue";
import IconPhone from "@/components/icons/contacts/IconPhone.vue";
import IconGithub from "@/components/icons/contacts/IconGithub.vue";
import IconLocation from "@/components/icons/contacts/IconLocation.vue";
import IconLinkedIn from "@/components/icons/contacts/IconLinkedIn.vue";

export default interface Contact {
    icon: Component
    link: (value: string) => string | undefined
}

export interface ContactMap{
    email: Contact
    phone: Contact
    github: Contact
    location: Contact
    linkedin: Contact
}

export type ContactKey = keyof ContactMap;

export const components: ContactMap = {
    email: {
        icon: IconEmail,
        link: (value: string) => `mailto:${value}`
    },
    phone: {
        icon: IconPhone,
        link: (_: string) => undefined
    },
    github: {
        icon: IconGithub,
        link: (value: string) => value
    },
    location: {
        icon: IconLocation,
        link: (_: string) => undefined
    },
    linkedin: {
        icon: IconLinkedIn,
        link: (value: string) => value
    }
};