import { Theme } from "@/models/style/Theme";

export class DefaultThemes {
    [key: string]: Theme

    readonly light: Theme
    readonly dark: Theme

    constructor(light: Theme, dark: Theme) {
        this.light = light;
        this.dark = dark;
    }
}