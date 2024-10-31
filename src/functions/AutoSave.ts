import { ref, provide, inject, Ref } from "vue";
import { SaveState } from "@/models/SaveState";

const injectorKey = Symbol();

interface SaveModel {
    state: Ref<SaveState>
    frequency: Ref<number>
    save: () => Promise<void>
}

export function provideSaveModel(model: SaveModel): void {
    provide(injectorKey, model);
}

export function injectSaveModel(): SaveModel {
    return inject(injectorKey, (): SaveModel => ({
        state: ref(SaveState.resolved),
        frequency: ref(0),
        save: async () => {}
    }), true);
}