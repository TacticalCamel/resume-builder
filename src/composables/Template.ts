import { computed, Ref } from "vue";
import { ResumeTemplate } from "@/models/ResumeTemplate";
import { Theme } from "@/models/style/Theme";
import { useThemes } from "@/composables/Themes";
import { Color } from "@/models/style/Color";

export function useTemplate(template: Ref<ResumeTemplate>) {
    const {defaultLightTheme, defaultDarkTheme, findThemeById} = useThemes();

    function isColorModified(color: Color): boolean {
        // get the default color value
        const defaultValue: string | undefined = getDefaultColorValue(color);

        // if there is no default value, return false
        if (!defaultValue) {
            return false;
        }

        // compare the value to the default
        return getDefaultColorValue(color) !== color.value;
    }

    function resetColor(color: Color): void {
        // get the default color value
        const defaultValue: string | undefined = getDefaultColorValue(color);

        // if there is a one, change it and apply the color
        if (defaultValue) {
            color.value = defaultValue;
        }
    }

    function getDefaultColorValue(color: Color): string | undefined {
        const id: string | undefined = currentTheme.value.base;

        if(!id) {
            return undefined;
        }

        let baseTheme: Theme | undefined = findThemeById(id, template.value.themes);

        if (!baseTheme) {
            return undefined;
        }

        const baseColor: Color | undefined = baseTheme.colors.find(c => c.name === color.name);

        return baseColor?.value;
    }

    function addTheme(name: string, baseThemeId: string | undefined): Theme {
        const id: string = crypto.randomUUID();
        const baseTheme: Theme = (baseThemeId ? findThemeById(baseThemeId, template.value.themes) : undefined) ?? defaultLightTheme;
        const colors: Color[] = baseTheme.colors.map(color => ({name: color.name, value: color.value}));

        const theme: Theme = {
            id: id,
            name: name,
            base: baseThemeId,
            colors: colors
        };

        template.value.themes.push(theme);

        return theme;
    }

    const currentTheme = computed(() => {
        return findThemeById(template.value.currentTheme, template.value.themes) ?? defaultLightTheme;
    });

    const hasDefaultThemeSelected = computed<boolean>(() => {
        return defaultLightTheme.id === template.value.currentTheme || defaultDarkTheme.id === template.value.currentTheme;
    });

    const availableThemes = computed<Theme[]>(() => {
        return [defaultLightTheme, defaultDarkTheme, ...template.value.themes];
    });

    return {
        hasDefaultThemeSelected,
        availableThemes,
        currentTheme,
        isColorModified,
        resetColor,
        addTheme
    };
}