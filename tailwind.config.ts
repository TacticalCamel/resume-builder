import { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme';

function definePalette(colors: string[]) {
    return colors.reduce((palette: object, color: string) => {
        palette[color] = `rgb(var(--${color}))`;
        return palette;
    }, {});
}

const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts}",
    ],
    theme: {
        extend: {
            colors: definePalette([
                'foreground',
                'background',
                'primary',
                'secondary',
                'success',
                'warning',
                'error',
                'info'
            ])
        },
        screens: {
            'mobile': '480px',
            ...defaultTheme.screens
        }
    },
    plugins: []
}

export default config;