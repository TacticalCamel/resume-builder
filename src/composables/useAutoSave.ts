import { ref, watch, onMounted, onUnmounted, Ref, ComputedRef } from "vue";
import { SaveState } from "@/models/SaveState";

/**
 * This composable is used to save a value automatically at a given frequency.
 * @param reference The reactive object to track.
 * @param frequency The frequency of saving. Negative values = never save, 0 = save after every change, positive values = save every n milliseconds.
 * @param callback The function to execute every time a save occurs.
 */
export function useAutoSave<T>(reference: Ref<T> | ComputedRef<T>, frequency: Ref<number>, callback: (value: T) => Promise<void>) {
    // the status of the saving process
    const state: Ref<SaveState> = ref<SaveState>(SaveState.resolved);

    // the id of the current interval method, needed for cleanup
    let intervalId: number | undefined;

    // start save job when mounted
    onMounted(() => {
        restartInterval();
    })

    // cleanup when unmounted
    onUnmounted(() => {
        clearInterval(intervalId);
    });

    // track changes in the reference object and save depending on the frequency
    watch(reference, async (): Promise<void> => {
        // save immediately if the frequency is 0
        if (frequency.value === 0) {
            await save();
        }

        // otherwise mark as unsaved
        else if (state.value === SaveState.resolved) {
            state.value = SaveState.waiting;
        }
    }, {deep: true});

    // track changes in the frequency and restart the save job on change
    watch(frequency, async (): Promise<void> => {
        restartInterval();

        // trigger an instant save if necessary
        if (state.value === SaveState.waiting && frequency.value === 0) {
            await save();
        }
    });

    function restartInterval(): void {
        // stop previous save job
        clearInterval(intervalId);

        // start a new save job
        // if the frequency is non-positive, changes are either saved immediately or never saved, so there is no need to start a loop
        if (frequency.value > 0) {
            intervalId = setInterval(saveOnInterval, frequency.value);
        }
    }

    async function save(): Promise<void> {
        state.value = SaveState.pending;

        await callback(reference.value);

        state.value = SaveState.resolved;
    }

    async function saveOnInterval(): Promise<void> {
        // no changes made, no need to save
        if (state.value !== SaveState.waiting) {
            return;
        }

        await save();
    }

    // expose the save state and a function to allow manual saving
    return {
        state,
        save
    };
}