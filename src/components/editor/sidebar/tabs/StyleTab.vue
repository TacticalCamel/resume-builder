<script setup lang="ts">
    import { injectEditorModel } from "@/functions/Editor";
    import { EditorState } from "@/models/EditorState";
    import { TemplateModel } from "@/models/Template";
    import EditorTab from "@/components/editor/sidebar/generic/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import FadeTransition from "@/components/shared/transition/FadeTransition.vue";
    import InputButton from "@/components/shared/form/InputButton.vue";

    const {editorState, selectedElements, isGroupSelection} = injectEditorModel();

    const template = defineModel<TemplateModel>({
        required: true
    });

    function startSelection(): void {
        editorState.value = EditorState.select;
    }

    function stopSelection(): void {
        editorState.value = EditorState.edit;
    }

    function confirmSelection(): void {

    }
</script>

<template>
    <editor-tab>
        <editor-tab-item title="Create style">
            <fade-transition>
                <div v-if="editorState !== EditorState.select" class="flex gap-2 items-center">
                    <div class="text-foreground/70">Select elements your custom style will be applied to</div>
                    <button class="rounded bg-foreground/10 hover:bg-foreground/20 transition-colors py-1 px-2 text-nowrap" @click="startSelection()">Start selection</button>
                </div>

                <div v-else class="grid grid-cols-2 gap-2">
                    <div>Selection mode</div>
                    <div class="rounded bg-foreground/10 grid grid-cols-2 relative">
                        <button @click="isGroupSelection = false" class="px-2 py-1 z-10">Individual</button>
                        <button @click="isGroupSelection = true" class="px-2 py-1 z-10">Group</button>

                        <div class="absolute inset-y-0 w-1/2 rounded bg-primary transition-all" :class="isGroupSelection ? 'left-1/2' : 'left-0'"/>
                    </div>

                    <div>Current selection</div>
                    <div>

                    </div>

                    <input-button class="outline-secondary" @click="confirmSelection()">Create style</input-button>
                    <input-button class="outline-error" @click="stopSelection()">Discard selection</input-button>
                </div>
            </fade-transition>
        </editor-tab-item>

        <editor-tab-item title="Applied styles">

        </editor-tab-item>
    </editor-tab>
</template>