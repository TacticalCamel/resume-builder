import { ref, computed, ComputedRef, DeepReadonly, Ref } from "vue";

/**
 * This composable handles an element selection.
 * @param elements A list of all tracked elements.
 * @param group Whether elements should be toggled by type instead of id.
 */
export function useElementSelection(elements: DeepReadonly<Ref<SelectableElement[]>>, group: DeepReadonly<Ref<boolean>>) {
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
    const activeSelector: ComputedRef<ElementSelector> = computed(() => ({
        types: types.value,
        ids: ids.value
    }));

    /**
     * Modify the selection when an element is clicked.
     * @param target The target element.
     */
    function toggleSelection(target: SelectableElement): void {
        // call the appropriate function depending on the selection mode
        if (group.value) {
            toggleByType(target);
        }
        else {
            toggleById(target);
        }
    }

    /**
     * Add or remove an element from the selection by type.
     * @param target The target element.
     */
    function toggleByType(target: SelectableElement): void {
        // search for the element type in the selection
        const index: number = types.value.indexOf(target.type);

        // CASE 1: selected by type, unselect
        if (index >= 0) {
            types.value.splice(index, 1);
            return;
        }

        // CASE 2: not selected, select by type
        if (!ids.value.includes(target.id)) {
            types.value.push(target.type);
        }

        // CASE 2 and 3: remove all ids with the same type
        // regardless the state of type selections
        removeIdsOfType(target.type);
    }

    /**
     * Add or remove an element from the selection by id.
     * @param target The target element.
     */
    function toggleById(target: SelectableElement): void {
        // CASE 1: selected by type, split into ids
        if (trySplitSelection(target)) {
            return;
        }

        // search for the element id in the selection
        const index: number = ids.value.findIndex(id => target.id === id);

        // CASE 2: selected by id, unselect
        if (index >= 0) {
            ids.value.splice(index, 1);
            return;
        }

        // CASE 3: selecting by id will result in all elements of
        // a type being selected, merge into type selection
        if (tryMergeSelection(target)) {
            return;
        }

        // CASE 4: unselected, add by id
        ids.value.push(target.id);
    }

    /**
     * Attempt to split a type selection into individual id selections.
     * @param target The target element.
     * @returns True if the operation was successful, false otherwise.
     */
    function trySplitSelection(target: SelectableElement): boolean {
        // search for the element type in the selection
        const index: number = types.value.indexOf(target.type);

        // the element is not selected by type
        // splitting is not possible
        if (index < 0) {
            return false;
        }

        // unselect the type
        types.value.splice(index, 1);

        // get all element ids of the same type except the target element
        const matchingIds: string[] = elements.value
            .filter(element => element.type === target.type && element.id !== target.id)
            .map(element => element.id);

        // select these elements
        ids.value.push(...matchingIds);

        return true;
    }

    /**
     * Attempt to merge multiple id selections into a single type selection.
     * @param target The target element.
     * @returns True if the operation was successful, false otherwise.
     */
    function tryMergeSelection(target: SelectableElement): boolean {
        // the selection is merged when all elements of the target type
        // other than the target itself are selected
        const canMerge: boolean = elements.value.every((element): boolean => {
            // exclude elements of other types
            if (element.type !== target.type) {
                return true;
            }

            // target must not be selected
            if (element.id === target.id) {
                return !ids.value.includes(element.id);
            }

            // other elements must be selected
            return ids.value.includes(element.id);
        });

        if (!canMerge) {
            return false;
        }

        // unselect all ids with the target type
        removeIdsOfType(target.type);

        // select by type
        types.value.push(target.type);

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

    /**
     * Remove a type from the selection. Remove all types if no value is provided.
     * @remarks This action interacts with the selection directly rather than through a specific element.
     * It's allowed because reducing the selection is guaranteed to keep its state consistent.
     * @param type The type to remove.
     */
    function unselectType(type: string | undefined = undefined): void {
        // clear types when called without parameter
        if (!type) {
            types.value = [];
            return;
        }

        // find the provided type
        const index: number = types.value.indexOf(type);

        // remove if it exists
        if (index >= 0) {
            types.value.splice(index, 1);
        }
    }

    /**
     * Remove an id from the selection. Remove all ids if no value is provided.
     * @remarks This action interacts with the selection directly rather than through a specific element.
     * It's allowed because reducing the selection is guaranteed to keep its state consistent.
     * @param id The id to remove.
     */
    function unselectId(id: string | undefined = undefined): void {
        // clear ids when called without parameter
        if (!id) {
            ids.value = [];
            return;
        }

        // find the provided id
        const index: number = ids.value.indexOf(id);

        // remove if it exists
        if (index >= 0) {
            ids.value.splice(index, 1);
        }
    }

    /**
     * Remove all elements from the selection.
     */
    function clearSelection(): void {
        unselectType();
        unselectId();
    }

    return {
        activeSelector,
        toggleSelection,
        unselectType,
        unselectId,
        clearSelection
    };
}

export interface SelectableElement {
    type: string
    id: string
}

export interface ElementSelector {
    types: string[]
    ids: string[]
}