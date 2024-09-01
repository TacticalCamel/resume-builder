<script setup lang="ts">
    import { inject } from "vue";

    const model = defineModel<string>();

    const editable = inject<boolean>('editable', false);

    defineOptions({
        inheritAttrs: false
    });

    defineProps({
        placeholder: {
            type: String,
            default: '...'
        }
    });

    function saveChanges(e: Event) {
        model.value = (e.target as HTMLElement).innerText;
    }
</script>

<template>
    <div>
        <div class="inline-block">
            <div class="relative" :class="{editable}">
                <div class="text-input" v-bind="$attrs" :contenteditable="editable" spellcheck="false" @focusout="saveChanges">{{ model }}</div>
                <div v-show="editable" class="text-overlay pointer-events-none opacity-60">{{ placeholder }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    /*
     Style the container for the editable text. Use grid layout to align the text and the placeholder.
    */
    .editable {
        display: grid;
        grid-template-columns: 1fr;
        border-radius: 0.25rem;
        transition: background-color 150ms ease-in-out;
    }

    /*
     Highlight the editable text when hovered.
    */
    .editable:hover {
        background-color: rgb(var(--foreground) / 0.15);
    }

    /*
     Align the text and the placeholder to the same grid cell.
     We want to consider the width of the placeholder too, so absolute positioning is not ideal.
    */
    .editable > div {
        grid-row-start: 1;
        grid-column-start: 1;
    }

    /*
      Style the text input when it is editable.
    */
    .editable > .text-input {
        border-radius: 0.25rem;
        outline: transparent;
        transition: outline-color 150ms;
    }

    /*
     Outline for the focused text input to indicate that it is being edited.
    */
    .editable > .text-input:focus {
        outline: 2px dashed rgb(var(--warning));
    }

    /*
     Hide the placeholder when the text input contains text.
     Must use CSS to do this since the model is only updated on focusout.
    */
    .editable > .text-input:not(:empty) + .text-overlay {
        display: none;
    }
</style>