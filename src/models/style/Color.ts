export default interface Color {
    name: string
    value: string
}

export function isDarkContrast(value: string): boolean {
    const rgb: string[] = value.split(' ');

    const r: number = parseInt(rgb[0]);
    const g: number = parseInt(rgb[1]);
    const b: number = parseInt(rgb[2]);

    return r * 0.299 + g * 0.587 + b * 0.114 > 150;
}
