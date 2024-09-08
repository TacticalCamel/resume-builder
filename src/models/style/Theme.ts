import Color from "@/models/style/Color";
import { ISerializer, useSerializer } from "@/composables/Serializer";

export default class Theme {
    id: string
    name: string
    base: string | undefined
    colors: Color[]

    constructor(id: string, name: string, base: string | undefined, colors: Color[]) {
        this.id = id
        this.name = name
        this.base = base
        this.colors = colors
    }

    static readonly serializer: ISerializer = useSerializer({
        Theme,
        Color
    });
}