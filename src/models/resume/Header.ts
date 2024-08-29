import { Component } from "vue";
import IconEmail from "@/components/icons/IconEmail.vue";
import IconPhone from "@/components/icons/IconPhone.vue";
import IconGithub from "@/components/icons/IconGithub.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import IconLinkedIn from "@/components/icons/IconLinkedIn.vue";

export class ResumeHeader {
    picture: string | undefined
    name: string
    profession: string
    description: string
    contacts: Contact[]

    constructor() {
        this.name = '';
        this.profession = '';
        this.description = '';
        this.contacts = [
            new Contact('email', ''),
            new Contact('phone', ''),
            new Contact('github', ''),
            new Contact('location', '')
        ];
    }
}

export class Contact {
    type: string
    value: string

    constructor(type: string, value: string) {
        this.type = type;
        this.value = value;
    }
}

export class ContactView {
    icon: Component
    placeholder: string
    createURL: (value: string) => string | undefined

    private constructor(icon: Component, placeholder: string, createURL: (value: string) => string | undefined) {
        this.icon = icon;
        this.placeholder = placeholder;
        this.createURL = createURL;
    }

    static BINDINGS: Record<string, ContactView> = {
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
}