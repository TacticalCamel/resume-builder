import { inject, provide, ref, Ref } from "vue";
import { useElementSelection } from "@/composables/useElementSelection";
import { useElementRegistration } from "@/composables/useElementRegistration";
import { useEditorMode } from "@/composables/useEditorMode";
import { EditorMode } from "@/models/editor/EditorMode";
import { SaveState } from "@/models/editor/SaveState";
import { SelectableElement } from "@/models/editor/SelectableElement";

const injectorKey = Symbol();

/**
 * This composable allows interaction with the global state of the template editor.
 */
export function useEditor(): EditorState {
    return inject(injectorKey, (): EditorState => ({
        ...useEditorMode(EditorMode.view),
        ...useElementSelection(ref([] as SelectableElement[]), ref(false)),

        autosaveFrequency: ref(0),
        autosaveState: ref(SaveState.resolved),
        loadTemplate: () => {},
        saveTemplate: async () => {},

        registerElement: () => {},
        unregisterElement: () => {},
        highlightSelection: ref(false),
        groupSelection: ref(false),
    }), true);
}

export function initializeEditor(init: EditorInitState): void {
    const {elements, registerElement, unregisterElement} = useElementRegistration();

    const mode = useEditorMode(init.mode);

    const highlightSelection: Ref<boolean> = ref(true);
    const groupSelection: Ref<boolean> = ref(false);
    const selection = useElementSelection(elements, groupSelection);

    const state: EditorState = {
        autosaveState: init.state,
        autosaveFrequency: init.frequency,
        saveTemplate: init.save,
        loadTemplate: init.load,
        ...mode,
        ...selection,
        highlightSelection,
        groupSelection,
        registerElement,
        unregisterElement
    };

    provide<EditorState>(injectorKey, state);
}

type EditorState = ReturnType<typeof useEditorMode> & ReturnType<typeof useElementSelection> & {
    autosaveState: Readonly<Ref<SaveState>>
    autosaveFrequency: Ref<number>
    saveTemplate: () => Promise<void>
    loadTemplate: (id: string | undefined) => void

    registerElement: (element: SelectableElement) => void
    unregisterElement: (element: SelectableElement) => void
    highlightSelection: Ref<boolean>
    groupSelection: Ref<boolean>
}

type EditorInitState = {
    mode: EditorMode,
    save: () => Promise<any>,
    load: (id: string | undefined) => any
    state: Readonly<Ref<SaveState>>
    frequency: Ref<number>
}