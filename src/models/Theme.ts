import Color from "@/models/Color";

export default interface Theme {
    id: string
    name: string
    isDark: boolean
    colors: Color[]
}