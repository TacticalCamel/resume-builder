import { computed, ComputedRef, ref, Ref } from "vue";
import { EditorMode } from "@/models/editor/EditorMode";

/**
 * This composable is a simple wrapper for an editor mode value.
 * @param initialValue The value to use at initialization.
 */
export function useEditorMode(initialValue: EditorMode) {
    /**
     * The current mode.
     */
    const mode: Ref<EditorMode> = ref(initialValue);

    /**
     * True when the editor is in view mode. Used when viewing or printing a template.
     */
    const viewable: ComputedRef<boolean> = computed((): boolean => mode.value === EditorMode.view);

    /**
     * True when the editor is in edit mode. Used when editing a template.
     */
    const editable: ComputedRef<boolean> = computed((): boolean => mode.value === EditorMode.edit);

    /**
     * True when the editor is in view mode. Used when selecting elements of a template.
     */
    const selectable: ComputedRef<boolean> = computed((): boolean => mode.value === EditorMode.select);

    /**
     * Set the editor mode value.
     * @param value The new value.
     */
    function setMode(value: EditorMode): void {
        mode.value = value;
    }

    return {
        setMode,
        viewable,
        editable,
        selectable
    };
}