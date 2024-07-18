export default class LocalStorageService<T> {
    private readonly storageKey: string;

    constructor(storageKey: string) {
        this.storageKey = storageKey;
    }

    save(data: T): void {
        try {
            const serializedData: string = JSON.stringify(data);

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
                return JSON.parse(serializedData) as T;
            }

            return null;
        }
        catch (error) {
            console.error("Failed to load data from local storage:", error);
            return null;
        }
    }

    remove(): void {
        try {
            localStorage.removeItem(this.storageKey);
        }
        catch (error) {
            console.error("Failed to remove data from local storage:", error);
        }
    }
}