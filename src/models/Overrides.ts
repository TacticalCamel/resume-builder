export interface StyleOverride {
    name: string | undefined
    selector: StyleSelector
    properties: Record<string, string>
}

export interface StyleSelector {
    types: string[]
    ids: string[]
}