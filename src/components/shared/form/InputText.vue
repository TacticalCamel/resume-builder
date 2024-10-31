<script setup lang="ts">
    import { computed } from "vue";
    import { injectEditorModel } from "@/functions/Editor";
    import { EditorState } from "@/models/EditorState";

    const model = defineModel<string>();

    const {editorState} = injectEditorModel();

    const editable = computed(() => editorState.value === EditorState.edit);

    defineOptions({
        inheritAttrs: false
    });

    const {placeholder = '...'} = defineProps<{
        placeholder?: string
    }>();

    function saveChanges(e: Event) {
        const element: HTMLElement = e.target as HTMLElement;
        const text: string = element.textContent ?? '';

        model.value = text;
        element.textContent = text;
    }
</script>

<template>
    <div>
        <div class="inline-block">
            <div class="relative" :class="{editable}">
                <div
                    v-bind="$attrs"
                    v-text="model"
                    @focusout="saveChanges"
                    :contenteditable="editable"
                    spellcheck="false"
                    class="text-input"
                />

                <div
                    v-show="editable"
                    v-bind="$attrs"
                    v-text="placeholder"
                    class="text-overlay pointer-events-none opacity-60"
                />
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
    /*
     Style the container for the editable text. Use grid layout to align the text and the placeholder.
     Highlight the editable text when hovered.
    */
    .editable {
        @apply grid rounded transition-colors grid-cols-[1fr];

        &:hover:not(:focus-within) {
            @apply bg-foreground/15;
        }
    }

    /*
     Align the text and the placeholder to the same grid cell.
     We want to consider the width of the placeholder too, so absolute positioning is not ideal.
    */
    .editable > div {
        @apply col-start-1 row-start-1;
    }

    /*
      Style the text input when it is editable.
      Outline for the focused text input to indicate that it is being edited.
    */
    .editable > .text-input {
        @apply rounded outline-transparent transition-[outline-color];

        &:focus {
            @apply outline outline-2 outline-warning;
        }
    }

    /*
     Hide the placeholder when the text input contains text.
     Must use CSS to do this since the model is only updated on focusout.
    */
    .editable > .text-input:not(:empty) + .text-overlay {
        @apply hidden;
    }
</style>