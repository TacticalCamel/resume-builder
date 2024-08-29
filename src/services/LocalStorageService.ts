import JsonSerializer from "@/services/JsonSerializer";

export default class LocalStorageService<T> {
    private readonly storageKey: string;
    private readonly serializer: JsonSerializer;

    constructor(storageKey: string, serializer: JsonSerializer = new JsonSerializer()) {
        this.storageKey = storageKey;
        this.serializer = serializer;
    }

    save(data: T): void {
        try {
            const serializedData: string = this.serializer.serialize<T>(data);

            localStorage.setItem(this.storageKey, serializedData);
        }
        catch (error) {
            console.error("Failed to save data to local storage:", error);
        }
    }

    load(): T | null {
        try {
            const serializedData: string | null = localStorage.getItem(this.storageKey);

            if (serializedData) {
                return this.serializer.deserialize<T>(serializedData);
            }

            return null;
        }
        catch (error) {
            console.error("Failed to load data from local storage:", error);

            return null;
        }
    }

    remove(): void {
        localStorage.removeItem(this.storageKey);
    }
}