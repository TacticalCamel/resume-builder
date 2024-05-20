import type Template from "@/models/Template";

export default interface PageModel {
    profilePicture: string | null,
    template: Template | null,
    isDarkTheme: boolean
}