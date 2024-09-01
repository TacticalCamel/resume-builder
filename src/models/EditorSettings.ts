export default interface EditorSettings {
    filters: {
        grayscale: number
        contrast: number
        brightness: number
    }
    printing: {
        preview: boolean
        scale: number
        orientation: string
        size: string
    }
}