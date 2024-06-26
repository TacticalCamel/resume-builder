import type Template from "@/models/Template";

export default interface PageModel {
    isDarkTheme: boolean
    isSettingsOpen: boolean
    colors: Map<string, string>
    template: Template | null
}

export function createPageModel(): PageModel {
    return {
        isSettingsOpen: false,
        isDarkTheme: false,
        colors: new Map<string, string>(),
        template: null,
    }
}