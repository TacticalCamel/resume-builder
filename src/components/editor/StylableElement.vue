<script setup lang="ts">
    import { computed, onUnmounted } from "vue";
    import { useEditor } from "@/composables/useEditor";
    import { SelectableElement } from "@/composables/useElementSelection";

    const {id, type} = defineProps<{
        id?: string
        type: string
    }>();

    const {selectable, registerElement, unregisterElement, toggleSelection, highlightSelection, activeSelector} = useEditor();

    const {element, selected} = createElement();

    function createElement() {
        const element = computed<SelectableElement>(() => ({
            type: type,
            id: id ?? type
        }));

        registerElement(element.value);

        const selected = computed<boolean>(() => {
            return activeSelector.value.ids.includes(element.value.id) || activeSelector.value.types.includes(element.value.type);
        });

        return {
            element,
            selected
        };
    }

    function onClick(e: Event): void {
        if (!selectable.value) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        toggleSelection(element.value);
    }

    onUnmounted(() => {
        unregisterElement(element.value);
    });
</script>

<template>
    <div class="stylable-element" :class="[element.type, {selectable, selected, 'highlight': highlightSelection}]" :id="element.id" @click="onClick">
        <slot/>
    </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped lang="postcss">
    .stylable-element {
        @apply outline-transparent transition-[outline-color] -outline-offset-1;

        &.selectable {
            @apply select-none rounded outline-1;

            &.highlight {
                @apply outline-foreground/30 outline-dashed;
            }

            &.selected {
                @apply outline-info outline bg-info/5;
            }
        }
    }
</style>