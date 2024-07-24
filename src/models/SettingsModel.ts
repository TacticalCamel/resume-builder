export default interface SettingsModel {
    settingsOpen: boolean
    editable: boolean
    monochrome: boolean
}

export function getDefaultSettings(): SettingsModel {
    return {
        settingsOpen: false,
        editable: false,
        monochrome: false
    }
}