export interface LanguageSection{
    title: string | null,
    languages: Language[]
}

export interface Language{
    name: string,
    level: string
}