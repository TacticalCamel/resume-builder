import { Ref, ComputedRef, onMounted, onUnmounted, readonly, ref, watch } from "vue";

/**
 * This composable is used to save a value automatically at a given frequency.
 * @param reference The reactive object to track.
 * @param frequency The frequency of saving. Negative values = never save, 0 = save after every change, positive values = save every n milliseconds.
 * @param callback The function to execute every time a save occurs.
 */
export function useAutosave<T, TReturn = any>(reference: Ref<T> | ComputedRef<T>, frequency: Ref<number>, callback: (value: T) => TReturn | Promise<TReturn>): AutoSave<TReturn> {
    /**
     * The status of the saving process.
     */
    const state: Ref<SaveState> = ref<SaveState>(SaveState.resolved);

    /**
     * The id of the current interval method.
     * Tracked for cleanup purposes.
     */
    let intervalId: number | undefined;

    /**
     * Start the save job when mounted.
     */
    onMounted(() => {
        restartInterval();
    })

    /**
     * Cleanup when unmounted.
     */
    onUnmounted(() => {
        clearInterval(intervalId);
    });

    /**
     * Track changes to the object and save it when necessary.
     */
    watch(reference, async (): Promise<void> => {
        // mark as unsaved
        state.value = SaveState.waiting;

        // save immediately if the frequency is 0
        if (frequency.value === 0) {
            await save();
        }
    }, {deep: true});

    /**
     * Track changes to the frequency and restart the save job when necessary.
     */
    watch(frequency, async (): Promise<void> => {
        // restart the save loop
        restartInterval();

        // trigger an instant save if necessary
        if (frequency.value === 0) {
            await save();
        }
    });

    /**
     * Start the periodic saving of the tracked object.
     */
    function restartInterval(): void {
        // stop previous save job
        clearInterval(intervalId);

        // start a new save job
        // if the frequency is non-positive, there is no need to start a loop,
        // because changes are either saved immediately or never
        if (frequency.value > 0) {
            intervalId = setInterval(save, frequency.value);
        }
    }

    /**
     * Save the tracked object.
     * Use this function for manual saving.
     * @returns The return value of the callback if a save occurred, undefined otherwise.
     */
    async function save(): Promise<TReturn | undefined> {
        // no changes made
        // resolve immediately since there is nothing to save
        if (state.value !== SaveState.waiting) {
            return undefined;
        }

        // update the state to pending while the callback executes
        state.value = SaveState.pending;

        // call the provided save function
        const result: TReturn = await callback(reference.value);

        // update the state to resolved when the callback returns
        state.value = SaveState.resolved;

        // return the result of the callback
        return result;
    }

    return {
        state: readonly(state),
        save
    };
}

export enum SaveState {
    // has changes, saving in progress
    pending = 0,

    // no changes, saved
    resolved = 1,

    // has changes, not saved
    waiting = 2
}

export interface AutoSave<TReturn> {
    // expose state as read only
    state: Readonly<Ref<SaveState>>

    // expose function for manual saving
    save: () => Promise<TReturn | undefined>
}