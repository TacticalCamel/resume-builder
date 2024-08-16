export default interface SettingsModel {
    tabIndex: number
    editable: boolean
    filters: {
        grayscale: number
        contrast: number
        brightness: number
    }
}

export function getDefaultSettings(): SettingsModel {
    return {
        tabIndex: 0,
        editable: true,
        filters: {
            grayscale: 0,
            contrast: 100,
            brightness: 100
        }
    }
}