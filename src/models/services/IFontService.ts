import { Font } from "@/models/style/Font";

export interface IFontService {
    get currentFont(): string
    set currentFont(font: string)

    get customFonts(): Font[]

    get systemFonts(): Font[]

    get canLoadSystemFonts(): boolean

    loadSystemFonts(): Promise<void>
    addCustomFont(font: Font): Promise<void>
}