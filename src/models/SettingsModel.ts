import type Theme from "@/models/themes/Theme";

export default interface SettingsModel {
    settingsOpen: boolean
    editable: boolean
    monochrome: boolean
    themes: Theme[]
    currentTheme: string | undefined
}

export function getDefaultSettings(): SettingsModel {
    return {
        settingsOpen: false,
        editable: false,
        monochrome: false,
        themes: [
            {
                name: 'Light',
                colors: [
                    {
                        name: '--primary',
                        value: '25 24 24'
                    },
                    {
                        name: '--accent',
                        value: '157 83 223'
                    },
                    {
                        name: '--background',
                        value: '245 245 245'
                    }
                ]
            },
            {
                name: 'Dark',
                colors: [
                    {
                        name: '--primary',
                        value: '245 245 245'
                    },
                    {
                        name: '--accent',
                        value: '157 83 223'
                    },
                    {
                        name: '--background',
                        value: '25 24 24'
                    }
                ]
            }
        ],
        currentTheme: undefined
    }
}