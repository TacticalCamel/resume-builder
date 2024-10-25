import { UniqueId } from "@/models/UniqueId";

export interface ResumeHeader extends UniqueId {
    picture: string | undefined
    name: string
    profession: string
    description: string
    contacts: Contact[]
}

export enum ContactType {
    email = 0,
    phone = 1,
    github = 2,
    location = 3,
    linkedin = 4
}

export interface Contact extends UniqueId {
    type: ContactType
    value: string
}