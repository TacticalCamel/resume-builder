<script setup lang="ts">
    import { useEditor } from "@/composables/useEditor";

    const model = defineModel<string>();

    const {editable} = useEditor();

    defineOptions({
        inheritAttrs: false
    });

    const {placeholder = '...'} = defineProps<{
        placeholder?: string
    }>();

    function save(e: Event) {
        const element: HTMLElement = e.target as HTMLElement;
        const text: string = element.textContent ?? '';

        model.value = text;
        element.textContent = text;
    }
</script>

<template>
    <div class="text-input" :class="{editable}">
        <div
            v-bind="$attrs"
            v-text="model"
            @focusout="save"
            :contenteditable="editable"
            spellcheck="false"
            class="textbox"
        />

        <div
            v-bind="$attrs"
            v-text="placeholder"
            class="placeholder pointer-events-none opacity-60"
        />
    </div>
</template>

<style lang="postcss" scoped>
    .text-input {
        @apply relative inline-grid rounded transition-colors grid-cols-[1fr];

        &.editable:hover:not(:focus-within) {
            @apply bg-foreground/15;
        }

        &.editable > .textbox {
            @apply rounded outline-transparent transition-[outline-color];

            &:focus {
                @apply outline outline-2 outline-warning;
            }
        }

        & > .textbox:not(:empty) + .placeholder {
            @apply hidden;
        }

        &:not(.editable) .textbox:empty {
            @apply hidden;
        }
    }

    .textbox, .placeholder {
        @apply col-start-1 row-start-1;
    }
</style>