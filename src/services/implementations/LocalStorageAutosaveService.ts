import { ref, Ref, watchEffect } from "vue";
import ISerializer from "@/services/interfaces/ISerializer";
import JsonSerializer from "@/services/implementations/JsonSerializer";

export default class LocalStorageAutosaveService<T> {
    private readonly service: LocalStorageService<T>;
    private readonly data: Ref<T>;

    constructor(storageKey: string, createDefault: () => T, serializer: ISerializer = new JsonSerializer()) {
        // initialize the service
        this.service = new LocalStorageService<T>(storageKey, serializer);

        // attempt to load the saved data
        let savedData: T | undefined = this.service.load();

        // if no data was found, set the default value using the provided function,
        // then save the value to the local storage
        if (!savedData) {
            savedData = createDefault();
            this.service.save(savedData);
        }

        // create a reactive reference to the data
        this.data = ref<T>(savedData) as Ref<T>;

        // watch for changes to the data
        watchEffect(() => {
            if(this.data.value) {
                this.service.save(this.data.value);
            }
            else {
                this.service.remove();
            }
        });
    }

    get value(): T {
        return this.data.value;
    }

    set value(newData: T) {
        this.data.value = newData;
    }
}

class LocalStorageService<T> {
    private readonly storageKey: string;
    private readonly serializer: ISerializer;

    constructor(storageKey: string, serializer: ISerializer) {
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

    load(): T | undefined {
        try {
            const serializedData: string | null = localStorage.getItem(this.storageKey);

            if (serializedData) {
                return this.serializer.deserialize<T>(serializedData);
            }
        }
        catch (error) {
            console.error("Failed to load data from local storage:", error);
        }
    }

    remove(): void {
        localStorage.removeItem(this.storageKey);
    }
}