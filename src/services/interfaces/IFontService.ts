import Font from "@/models/style/Font";

export default interface IFontService {
    get currentFont(): string
    set currentFont(font: string)

    get systemFonts(): Promise<Font[]>

    get customFonts(): Promise<Font[]>

    get canLoadSystemFonts(): boolean

    loadSystemFonts(): Promise<void>
    addCustomFont(font: Font): Promise<void>
}