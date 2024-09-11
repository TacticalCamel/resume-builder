import { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme';

function defineColor(name: string): string {
    return `rgb(var(${name}))`
}

const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts}",
    ],
    theme: {
        extend: {
            colors: {
                foreground: defineColor('--foreground'),
                background: defineColor('--background'),
                primary: defineColor('--primary'),
                secondary: defineColor('--secondary'),

                success: defineColor('--success'),
                warning: defineColor('--warning'),
                error: defineColor('--error'),
                info: defineColor('--info'),
            }
        },
        screens: {
            'mobile': '480px',
            ...defaultTheme.screens
        }
    },
    plugins: []
}

export default config;