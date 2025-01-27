import { UniqueId } from "@/models/UniqueId";
import { ColorPalette } from "@/models/ColorPalette";

/**
 * Represent a set of colors used to style the page.
 * Can have base theme to inherit colors from another theme
 */
export interface Theme extends UniqueId {
    name?: string
    base?: string
    colors: ColorPalette
}