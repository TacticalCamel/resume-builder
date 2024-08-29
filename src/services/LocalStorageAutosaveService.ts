import { ref, Ref, watchEffect } from "vue";
import LocalStorageService from "@/services/LocalStorageService";
import JsonSerializer from "@/services/JsonSerializer";

export default class LocalStorageAutosaveService<T> {
    private readonly service: LocalStorageService<T>;
    private readonly data: Ref<T>;

    constructor(storageKey: string, createDefault: () => T, serializer: JsonSerializer = new JsonSerializer()) {
        // initialize the service
        this.service = new LocalStorageService<T>(storageKey, serializer);

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