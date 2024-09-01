export default class Color {
    name: string
    value: string

    constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }

    get isDarkContrast(): boolean {
        const rgb: string[] = this.value.split(' ');

        const r: number = parseInt(rgb[0]);
        const g: number = parseInt(rgb[1]);
        const b: number = parseInt(rgb[2]);

        return r * 0.299 + g * 0.587 + b * 0.114 > 150;
    }
}