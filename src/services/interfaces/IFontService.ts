import Font from "@/models/Font";

export default interface IFontService {
    get currentFont(): string
    set currentFont(font: string)

    get systemFonts(): Font[]

    get customFonts(): Font[]

    get canLoadSystemFonts(): boolean

    loadSystemFonts(): void
}