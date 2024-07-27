const defaultTheme = require('tailwindcss/defaultTheme')

// noinspection JSUnusedGlobalSymbols
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                foreground: ({opacityValue}) => colorWithOpacity('--foreground', opacityValue),
                background: ({opacityValue}) => colorWithOpacity('--background', opacityValue),

                primary: ({opacityValue}) => colorWithOpacity('--primary', opacityValue),
                secondary: ({opacityValue}) => colorWithOpacity('--secondary', opacityValue),

                success: ({opacityValue}) => colorWithOpacity('--success', opacityValue),
                warning: ({opacityValue}) => colorWithOpacity('--warning', opacityValue),
                error: ({opacityValue}) => colorWithOpacity('--error', opacityValue),
                info: ({opacityValue}) => colorWithOpacity('--info', opacityValue),
            }
        },
        screens: {
            'mobile': '480px',
            ...defaultTheme.screens
        }
    },
    plugins: []
}

function colorWithOpacity(color: string, opacity: string | undefined) {
    return `rgba(var(${color}) / ${opacity ?? 1})`
}