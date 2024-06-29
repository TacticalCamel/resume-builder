import type Color from "@/models/Color";

export default interface SettingsModel{
    darkTheme: boolean
    settingsOpen: boolean
    editable: boolean
    monochrome: boolean
    colors: Color[]
}