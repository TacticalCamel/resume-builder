export interface StyleOverride {
    name: string | undefined
    selector: StyleSelector
    styles: Record<string, string>
}

export interface StyleSelector {
    types: string[]
    ids: string[]
}