import { Component } from "vue";
import IconEmail from "@/components/shared/icons/IconEmail.vue";
import IconPhone from "@/components/shared/icons/IconPhone.vue";
import IconGithub from "@/components/shared/icons/IconGithub.vue";
import IconLocation from "@/components/shared/icons/IconLocation.vue";
import IconLinkedIn from "@/components/shared/icons/IconLinkedIn.vue";

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

    static get draggableCategory(): string {
        return Contact.name;
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
        email: new ContactView(IconEmail, 'Email address', (value: string) => `mailto:${value}`),
        phone: new ContactView(IconPhone, 'Phone number', (_: string) => undefined),
        github: new ContactView(IconGithub, 'Github profile URL', (value: string) => value),
        location: new ContactView(IconLocation, 'Physical location', (_: string) => undefined),
        linkedin: new ContactView(IconLinkedIn, 'LinkedIn profile URL', (value: string) => value)
    };
}