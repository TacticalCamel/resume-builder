import type Theme from "@/models/themes/Theme";

export default interface SettingsModel{
    settingsOpen: boolean
    editable: boolean
    monochrome: boolean
    themes: Theme[]
    currentTheme: string | undefined
}