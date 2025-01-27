import { Color } from "@/models/Color";

/**
 * Represent a collection of colors in a theme.
 */
export interface ColorPalette {
    [key: string]: Color

    foreground: Color
    background: Color
    primary: Color
    secondary: Color
    success: Color
    warning: Color
    error: Color
    info: Color
}