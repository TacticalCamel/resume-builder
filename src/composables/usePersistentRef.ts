import { ref, watchEffect, Ref } from 'vue';

/**
 * This composable is used to create a reactive reference that backs up its current state to the browser localstorage.
 * @param key The localstorage key to use.
 * @param defaultValue The initial value to use if no previously saved value is present.
 */
export function usePersistentRef<T>(key: string, defaultValue: T): Ref<T> {
    // create a reactive reference to the value
    const reference: Ref<T> = initialize();

    // save the value whenever it changes
    watchEffect(() => {
        save(reference.value);
    });

    // initialize the refer
    function initialize(): Ref<T> {
        // attempt to load the saved value
        let value: T | undefined = load();

        // if no value was found, set the default value and save it
        if (value === undefined) {
            value = defaultValue;

            save(value);
        }

        return ref(value) as Ref<T>;
    }

    // save the value to localstorage
    function save(value: T): void {
        if (value === undefined) {
            localStorage.removeItem(key);

            return;
        }

        try {
            const serializedValue: string = JSON.stringify(value);

            localStorage.setItem(key, serializedValue);
        }
        catch (error) {
            console.error(`Failed to save '${key}' to localstorage:`, error);
        }
    }

    // load the value from localstorage
    function load(): T | undefined {
        try {
            const serializedValue: string | null = localStorage.getItem(key);

            if (serializedValue) {
                return JSON.parse(serializedValue);
            }
        }
        catch (error) {
            console.error(`Failed to load '${key}' from localstorage:`, error);
        }
    }

    // expose the reference
    return reference;
}