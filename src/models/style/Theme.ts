import Color from "@/models/style/Color";

export default interface Theme {
    id: string
    name: string
    base: string | undefined
    colors: Color[]
}