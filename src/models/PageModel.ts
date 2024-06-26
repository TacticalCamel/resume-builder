import type Template from "@/models/Template";

export default interface PageModel {
    isDarkTheme: boolean
    isSettingsOpen: boolean
    colors: Map<string, string>
    template: Template | null
}