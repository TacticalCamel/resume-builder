import { ref, watch, Ref, WatchOptions } from "vue";
import LocalStorageService from "@/services/LocalStorageService";

export default class LocalStorageAutosaveService<T> {
    private readonly service: LocalStorageService<T>;
    private readonly data: Ref<T>;

    constructor(storageKey: string, createDefault: () => T, options: WatchOptions<false> | undefined = undefined) {
        // initialize the service
        this.service = new LocalStorageService<T>(storageKey);

        // attempt to load the saved data
        let savedData: T | null = this.service.load();

        // if no data was found, set the default value using the provided function,
        // then save the value to the local storage
        if (!savedData) {
            savedData = createDefault();
            this.service.save(savedData);
        }

        // create a reactive reference to the data
        this.data = ref<T>(savedData) as Ref<T>;

        // watch for changes to the data
        watch(this.data, (newData: T | null): void => {
            // if a non-null value is provided, save it to the local storage
            if (newData) {
                this.service.save(newData);
            }

            // otherwise, remove the value from the local storage
            else {
                this.service.remove();
            }
        }, options);
    }

    get value(): T {
        return this.data.value;
    }

    set value(newData: T) {
        this.data.value = newData;
    }
}