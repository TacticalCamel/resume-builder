export default class JsonSerializer {
    serialize<T>(data: T): string {
        return JSON.stringify(data);
    }

    deserialize<T>(data: string): T {
        return JSON.parse(data);
    }
}