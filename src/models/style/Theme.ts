import { Color } from "@/models/style/Color";

export interface Theme {
    id: string
    name: string
    base: string | undefined
    colors: Color[]
}