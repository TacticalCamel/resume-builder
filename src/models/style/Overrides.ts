export interface StyleOverride {
    selector: StyleSelector
    styles: Record<string, string>
}

export interface StyleSelector {
    classes: string[]
    ids: string[]
}