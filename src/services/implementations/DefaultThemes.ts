import Theme from "@/models/Theme";

export default class DefaultThemes {
    [key: string]: Theme

    readonly light: Theme
    readonly dark: Theme

    constructor(light: Theme, dark: Theme) {
        this.light = light;
        this.dark = dark;
    }
}