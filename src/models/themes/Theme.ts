import Color from "@/models/themes/Color";

export default interface Theme {
    id: string
    name: string
    colors: Color[]
}