export default interface Color{
    name: string
    value: string
}

export function hasDarkContrastText(rgb: string): boolean{
    const rgbValues = rgb.split(' ');
    const r = parseInt(rgbValues[0]);
    const g = parseInt(rgbValues[1]);
    const b = parseInt(rgbValues[2]);

    const brightness: number = r * 0.299 + g * 0.587 + b * 0.114;

    return brightness > 150;
}