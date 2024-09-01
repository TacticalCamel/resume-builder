import Color from "@/models/Color";
import TypedJsonSerializer from "@/services/implementations/TypedJsonSerializer";

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

    static readonly serializer: TypedJsonSerializer = new TypedJsonSerializer({
        Theme,
        Color
    });
}