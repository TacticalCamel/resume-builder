import { inject, provide, ref, Ref } from "vue";
import { EditorState } from "@/models/EditorState";
import { ElementSelection } from "@/models/ElementSelection";

const injectorKey = Symbol();

interface EditorModel {
    editorState: Ref<EditorState>
    selectedElements: Ref<ElementSelection>
    isGroupSelection: Ref<boolean>
}

export function provideEditorModel(model: EditorModel): void {
    provide(injectorKey, model);
}

export function injectEditorModel(): EditorModel {
    return inject(injectorKey, (): EditorModel => ({
        editorState: ref(EditorState.view),
        selectedElements: ref({ids: [], classes: []}),
        isGroupSelection: ref(false)
    }), true);
}
