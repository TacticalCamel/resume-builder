import { onMounted, onUnmounted, ref, watch, Ref } from "vue";
import { SaveState } from "@/models/SaveState";

export function useAutosave<T>(value: T, frequency: Ref<number>, save: (value: T) => Promise<void>){
    // create a reactive reference to the value
    const reference: Ref<T> = ref<T>(value) as Ref<T>;

    // create a reactive reference to the save frequency
    //const frequency: Ref<number> = ref<number>(frequencyMs);

    // store the status of the saving process
    const status: Ref<SaveState> = ref<SaveState>(SaveState.resolved);

    // the id of the current interval method, needed for cleanup
    let intervalId: number | undefined = undefined;

    // start save job when mounted
    onMounted(() => {
        startPeriodicalSave();
    })

    // cleanup when unmounted
    onUnmounted(() => {
        clearInterval(intervalId);
    });

    // track changes in the reference object and save depending on the frequency
    watch(reference, async (): Promise<void> => {
        // save immediately if the frequency is 0
        if(frequency.value === 0) {
            await saveValue();
        }

        // otherwise mark as unsaved
        else if(status.value === SaveState.resolved) {
            status.value = SaveState.waiting;
        }
    }, {deep: true});

    // track changes in the frequency and restart the save job on change
    watch(frequency, async (): Promise<void> => {
        startPeriodicalSave();

        // trigger an instant save if necessary
        if(status.value === SaveState.waiting && frequency.value === 0) {
            await saveValue();
        }
    });

    function startPeriodicalSave(): void {
        // do nothing when the frequency is non-positive
        // in this case changes are saved immediately so there is no need to start a loop
        if(frequency.value <= 0) {
            return;
        }

        // stop previous save job
        clearInterval(intervalId);

        // start a new save job
        intervalId = setInterval(saveOnInterval, frequency.value);
    }

    async function saveValue(): Promise<void> {
        status.value = SaveState.pending;

        await save(reference.value);

        // TODO: intentional delay to see loading state, remove later
        await new Promise(resolve => setTimeout(resolve, 500));

        status.value = SaveState.resolved;
    }

    async function saveOnInterval(): Promise<void> {
        // no changes made, no need to save
        if(status.value !== SaveState.waiting) {
            return;
        }

        await saveValue();
    }

    return {
        reference,
        frequency,
        status,
        saveValue
    };
}