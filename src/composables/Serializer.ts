export function useSerializer(): ISerializer {
    return new JsonSerializer();
}

export interface ISerializer {
    serialize<T>(data: T): string;

    deserialize<T>(data: string): T;
}

class JsonSerializer implements ISerializer {
    serialize<T>(data: T): string {
        return JSON.stringify(data);
    }

    deserialize<T>(data: string): T {
        return JSON.parse(data);
    }
}