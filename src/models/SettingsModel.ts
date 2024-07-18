export default interface SettingsModel {
    settingsOpen: boolean
    editable: boolean
    monochrome: boolean
    currentFont: string | undefined
}

export function getDefaultSettings(): SettingsModel {
    return {
        settingsOpen: false,
        editable: false,
        monochrome: false,
        currentFont: undefined
    }
}