const defaultTheme = require('tailwindcss/defaultTheme')

function colorWithOpacity(color: string, opacity: string) {
    return `rgba(var(${color}) / ${opacity})`
}

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
                primary: ({opacityValue}) => colorWithOpacity('--primary', opacityValue),
                background: ({opacityValue}) => colorWithOpacity('--background', opacityValue),
                accent: ({opacityValue}) => colorWithOpacity('--accent', opacityValue),
            }
        },
        screens: {
            'mobile': '480px',
            ...defaultTheme.screens
        }
    },
    plugins: []
}