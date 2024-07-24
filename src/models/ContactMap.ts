import IconEmail from "@/components/icons/contacts/IconEmail.vue";
import IconPhone from "@/components/icons/contacts/IconPhone.vue";
import IconGithub from "@/components/icons/contacts/IconGithub.vue";
import IconLocation from "@/components/icons/contacts/IconLocation.vue";
import IconLinkedIn from "@/components/icons/contacts/IconLinkedIn.vue";
import Contact from "@/models/Contact";

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