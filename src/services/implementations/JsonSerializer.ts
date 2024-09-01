import ISerializer from "@/services/interfaces/ISerializer";

export default class JsonSerializer implements ISerializer{
    serialize<T>(data: T): string {
        return JSON.stringify(data);
    }

    deserialize<T>(data: string): T {
        return JSON.parse(data);
    }
}