import { Ref, ref, watchEffect } from 'vue';

export function usePersistentRef<T>(key: string, defaultValue: T | (() => T)): Ref<T> {
    // initialize the service
    const storage: LocalStorageService<T> = new LocalStorageService<T>(key);

    // attempt to load the saved value
    let savedValue: T | undefined = storage.load();

    // if no value was found, set the default value using the provided function,
    // then save the value to the local localstorage
    if (!savedValue) {
        if(typeof defaultValue === 'function') {
            savedValue = (defaultValue as (() => T))();
        }
        else {
            savedValue = defaultValue;
        }

        storage.save(savedValue);
    }

    // create a reactive reference to the value
    const reference: Ref<T> = ref<T>(savedValue) as Ref<T>;

    // watch for changes to the value
    watchEffect(() => {
        if (reference.value) {
            storage.save(reference.value);
        }
        else {
            storage.remove();
        }
    });

    // expose the reference
    return reference;
}

class LocalStorageService<T> {
    private readonly key: string

    constructor(key: string) {
        this.key = key;
    }

    save(value: T): void {
        try {
            const serializedValue: string = JSON.stringify(value);

            localStorage.setItem(this.key, serializedValue);
        }
        catch (error) {
            console.error(`Failed to save '${this.key}' to local localstorage:`, error);
        }
    }

    load(): T | undefined {
        try {
            const serializedValue: string | null = localStorage.getItem(this.key);

            if (serializedValue) {
                return JSON.parse(serializedValue);
            }
        }
        catch (error) {
            console.error(`Failed to load '${this.key}' from local localstorage:`, error);
        }
    }

    remove(): void {
        localStorage.removeItem(this.key);
    }
}