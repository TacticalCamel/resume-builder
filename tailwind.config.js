const defaultTheme = require('tailwindcss/defaultTheme')

// noinspection JSUnusedGlobalSymbols
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        screens: {
            'mobile': '480px',
            ...defaultTheme.screens
        }
    },
    plugins: [],
}