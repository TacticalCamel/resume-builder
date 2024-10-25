import { Color } from "@/models/style/Color";
import { UniqueId } from "@/models/UniqueId";

export interface Theme extends UniqueId {
    name: string
    base: string | undefined
    colors: Color[]
}