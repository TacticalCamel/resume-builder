import type Template from "@/models/Template";

export default interface PageModel {
    isDarkTheme: boolean,
    isEditMode: boolean,
    colors: Map<string, string>,
    profilePicture: string | null,
    template: Template | null,
}