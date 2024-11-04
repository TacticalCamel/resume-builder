import { inject, provide, ref, Ref } from "vue";
import { EditorState } from "@/models/EditorState";
import { ElementSelection } from "@/models/ElementSelection";

const injectorKey = Symbol();

interface EditorModel {
    editorState: Ref<EditorState>
    selection: Ref<ElementSelection>
    isGroupSelection: Ref<boolean>
    highlightSelection: Ref<boolean>
    loadTemplate: (id: string | undefined) => void
}

export function provideEditorModel(model: EditorModel): void {
    provide(injectorKey, model);
}

export function injectEditorModel(): EditorModel {
    return inject(injectorKey, (): EditorModel => ({
        editorState: ref(EditorState.view),
        selection: ref({ids: [], classes: []}),
        isGroupSelection: ref(false),
        highlightSelection: ref(false),
        loadTemplate: (): void => {},
    }), true);
}
