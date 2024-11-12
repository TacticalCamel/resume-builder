import { ref, watchEffect, Ref } from 'vue';

/**
 * This composable is used to create a reactive reference that backs up its current state to the browser localstorage.
 * @param key The localstorage key to use.
 * @param defaultValue The initial value to use if no previously saved value is present.
 */
export function useLocalstorageRef<T>(key: string, defaultValue: T): Ref<T> {
    /**
     * The reactive reference to the value.
     */
    const reference: Ref<T> = initialize();

    /**
     * Save the object whenever it changes.
     */
    watchEffect((): void => {
        save(reference.value);
    });

    /**
     * Initialize the reference.
     * @returns A ref with the saved or default value.
     */
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

    /**
     * Save the object to localstorage.
     * @param value The object to save.
     */
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

    /**
     * Load the object from localstorage.
     * @returns The object if it exists, otherwise undefined.
     */
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

    /**
     * Expose the ref.
     */
    return reference;
}