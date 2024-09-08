const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
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

function defineColor(name: string) {
    return (opacity: Partial<{ opacityVariable: string, opacityValue: number }>): string => {
        return `rgba(var(${name}) / ${opacity.opacityValue ?? 1})`;
    };
}