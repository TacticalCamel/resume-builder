import { Component } from "vue";
import { ContactType } from "@/models/resume/Header";
import IconEmail from "@/components/shared/icons/IconEmail.vue";
import IconPhone from "@/components/shared/icons/IconPhone.vue";
import IconGithub from "@/components/shared/icons/IconGithub.vue";
import IconLocation from "@/components/shared/icons/IconLocation.vue";
import IconLinkedIn from "@/components/shared/icons/IconLinkedIn.vue";

export function useContactViews() {
    function getContactView(type: ContactType): ContactView {
        return contactViews[type];
    }

    function getContactViews(): [ContactType, ContactView][] {
        return Object.entries(contactViews).map(([key, view]) => [Number(key) as ContactType, view]);
    }

    return {getContactView, getContactViews};
}

export interface ContactView {
    icon: Component
    name: string
    placeholder: string
    createURL?: (value: string) => string
}

const contactViews: Record<ContactType, ContactView> = {
    [ContactType.email]: {
        icon: IconEmail,
        name: 'Email',
        placeholder: 'Email address',
        createURL: (value: string) => `mailto:${value}`
    },
    [ContactType.phone]: {
        icon: IconPhone,
        name: 'Phone',
        placeholder: 'Phone number'
    },
    [ContactType.github]: {
        icon: IconGithub,
        name: 'Github',
        placeholder: 'Github profile URL',
        createURL: (value: string) => value
    },
    [ContactType.location]: {
        icon: IconLocation,
        name: 'Location',
        placeholder: 'Physical location'
    },
    [ContactType.linkedin]: {
        icon: IconLinkedIn,
        name: 'LinkedIn',
        placeholder: 'LinkedIn profile URL',
        createURL: (value: string) => value
    }
};