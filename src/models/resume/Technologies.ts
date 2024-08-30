export class Technology {
    name: string;

    constructor() {
        this.name = '';
    }

    static get draggableCategory(): string {
        return Technology.name;
    }
}