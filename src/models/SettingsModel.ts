export default interface SettingsModel {
    tabIndex: number
    editable: boolean
    monochrome: boolean
}

export function getDefaultSettings(): SettingsModel {
    return {
        tabIndex: 0,
        editable: true,
        monochrome: false
    }
}