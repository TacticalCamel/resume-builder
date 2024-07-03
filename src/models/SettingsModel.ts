import type Theme from "@/models/themes/Theme";

export default interface SettingsModel {
    settingsOpen: boolean
    editable: boolean
    monochrome: boolean
    themes: Theme[]
    currentTheme: string | undefined
    currentFont: string | undefined
}

export function getDefaultSettings(): SettingsModel {
    return {
        settingsOpen: false,
        editable: false,
        monochrome: false,
        themes: [
            {
                name: 'Default dark',
                colors: [
                    {name: '--primary', value: '246 249 252'},
                    {name: '--background', value: '23 26 33'},
                    {name: '--accent', value: '99 91 255'}
                ]
            },
            {
                name: 'Violet light',
                colors: [
                    {name: '--primary', value: '0 0 0'},
                    {name: '--background', value: '255 255 255'},
                    {name: '--accent', value: '115 46 220'}
                ]
            },
            {
                name: 'Violet dark',
                colors: [
                    {name: '--primary', value: '255 255 255'},
                    {name: '--background', value: '27 27 27'},
                    {name: '--accent', value: '150 98 228'}
                ]
            }
        ],
        currentTheme: undefined,
        currentFont: undefined
    }
}