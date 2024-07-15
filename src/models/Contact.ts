import type {Component} from "vue";

export default interface Contact {
    icon: Component
    placeholder: string
    createURL: (value: string) => string | undefined,
}