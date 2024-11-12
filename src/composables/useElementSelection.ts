import { ref, computed, ComputedRef, DeepReadonly, Ref } from "vue";

/**
 * This composable handles an element selection.
 * @param elements A list of all tracked elements.
 * @param group Whether elements should be toggled by type instead of id.
 */
export function useElementSelection<T extends Element>(elements: DeepReadonly<Ref<T[]>>, group: DeepReadonly<Ref<boolean>>) {
    /**
     * All element types in the current selection.
     */
    const types: Ref<string[]> = ref([]);

    /**
     * All element ids in the current selection.
     */
    const ids: Ref<string[]> = ref([]);

    /**
     * The currently active selector.
     */
    const activeSelector: ComputedRef<Selector> = computed((): Selector => ({
        types: types.value,
        ids: ids.value
    }));

    /**
     * Modify the selection when an element is clicked.
     * @param element The target element.
     */
    function toggleSelection(element: T): void {
        // call the appropriate function depending on the selection mode
        if (group.value) {
            toggleByType(element);
        }
        else {
            toggleById(element);
        }
    }

    /**
     * Unselect all elements.
     */
    function clearSelection(): void {
        types.value = [];
        ids.value = [];
    }

    /**
     * Add or remove an element from the selection by type.
     * @param element The target element.
     */
    function toggleByType(element: T): void {
        // search for the element type in the selection
        const index: number = types.value.indexOf(element.type);

        // CASE 1: selected by type, unselect
        if (index >= 0) {
            types.value.splice(index, 1);
            return;
        }

        // CASE 2: not selected, select by type
        if (!ids.value.includes(element.id)) {
            types.value.push(element.type);
        }

        // CASE 2 and 3: remove all ids with the same type
        // regardless the state of type selections
        removeIdsOfType(element.type);
    }

    /**
     * Add or remove an element from the selection by id.
     * @param element The target element.
     */
    function toggleById(element: T): void {
        // CASE 1: selected by type, split into ids
        if (trySplitSelection(element)) {
            return;
        }

        // search for the element id in the selection
        const index: number = ids.value.findIndex(id => element.id === id);

        // CASE 2: selected by id, unselect
        if (index >= 0) {
            ids.value.splice(index, 1);
            return;
        }

        // CASE 3: selecting by id will result in all elements of
        // a type being selected, merge into type selection
        if (tryMergeSelection(element)) {
            return;
        }

        // CASE 4: unselected, add by id
        ids.value.push(element.id);
    }

    /**
     * Attempt to split a type selection into individual id selections.
     * @param element The target element.
     * @returns True if the operation was successful, false otherwise.
     */
    function trySplitSelection(element: T): boolean {
        // search for the element type in the selection
        const index: number = types.value.indexOf(element.type);

        // the element is not selected by type
        // splitting is not possible
        if (index < 0) {
            return false;
        }

        // unselect the type
        types.value.splice(index, 1);

        // get all element ids of the same type except the target element
        const matchingIds: string[] = elements.value
            .filter(e => e.type === element.type && e.id !== element.id)
            .map(e => e.id);

        // select these elements
        ids.value.push(...matchingIds);

        return true;
    }

    /**
     * Attempt to merge multiple id selections into a single type selection.
     * @param element The target element.
     * @returns True if the operation was successful, false otherwise.
     */
    function tryMergeSelection(element: T): boolean {
        // the selection is merged when all elements of the target type
        // other than the target itself are selected
        const canMerge: boolean = elements.value.every((e: DeepReadonly<T>): boolean => {
            // exclude elements of other types
            if (e.type !== element.type) {
                return true;
            }

            // target must not be selected
            if (e.id === element.id) {
                return !ids.value.includes(e.id);
            }

            // other elements must be selected
            return ids.value.includes(e.id);
        });

        if (!canMerge) {
            return false;
        }

        // unselect all ids with the target type
        removeIdsOfType(element.type);

        // select by type
        types.value.push(element.type);

        return true;
    }

    /**
     * Unselect all element selected by id with a given type.
     * @param type The type to unselect.
     */
    function removeIdsOfType(type: string): void {
        ids.value = ids.value.filter((id: string): boolean => {
            // find the type from the list of all elements
            const elementType: string | undefined = elements.value.find(e => e.id === id)?.type;

            // remove if the type matches
            return elementType !== type;
        });
    }

    return {
        activeSelector,
        toggleSelection,
        clearSelection
    };
}

type Element = {
    type: string
    id: string
}

type Selector = {
    types: string[]
    ids: string[]
}