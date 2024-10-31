<script setup lang="ts">
    import { computed } from "vue";
    import { injectEditorModel } from "@/functions/Editor";
    import { useNotifications } from "@/composables/useNotifications";
    import { EditorState } from "@/models/EditorState";

    const {idSelector, classSelector} = defineProps<{
        idSelector: string
        classSelector: string
    }>();

    const {displayNotification} = useNotifications();

    const {editorState, selectedElements, isGroupSelection, highlightSelection} = injectEditorModel();

    const enabled = computed(() => editorState.value === EditorState.select);

    const selected = computed(() => {
        if (selectedElements.value.classes.includes(classSelector)) {
            return true;
        }

        return selectedElements.value.ids.some(element => element.id === idSelector);
    });

    function onSelect(e: Event): void {
        if (!enabled.value) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        if (isGroupSelection.value) {
            insertByClass();
        }
        else {
            insertById();
        }
    }

    function insertByClass(): void {
        // check whether the class is in the selection
        const index: number = selectedElements.value.classes.indexOf(classSelector);

        // already selected, remove it
        if (index >= 0) {
            selectedElements.value.classes.splice(index, 1);
            return;
        }

        // if the element is not selected, select it by class
        if(!selectedElements.value.ids.some(element => element.id === idSelector)) {
            selectedElements.value.classes.push(classSelector);
        }

        // remove all ids with the same class
        selectedElements.value.ids = selectedElements.value.ids.filter(element => element.class !== classSelector);
    }

    function insertById(): void {
        // when the element has its class selected, it cannot be selected or unselected by id
        if (selectedElements.value.classes.includes(classSelector)) {
            displayNotification('info', {
                message: 'Unselecting grouped elements individually are not yet supported',
                duration: 8000,
                actions: [
                    {
                        text: 'Switch to group mode',
                        onClick: () => {
                            isGroupSelection.value = true;
                        }
                    }
                ]
            });

            return;
        }

        // search by id
        const index: number = selectedElements.value.ids.findIndex(element => element.id === idSelector);

        // flip selection status
        if (index >= 0) {
            selectedElements.value.ids.splice(index, 1);
            return;
        }

        selectedElements.value.ids.push({
            id: idSelector,
            class: classSelector
        });
    }
</script>

<template>
    <div class="stylable-element" :class="[classSelector, {enabled, selected, 'highlight': highlightSelection}]" :id="idSelector" @click="onSelect">
        <slot/>
    </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped lang="postcss">
    .stylable-element {
        @apply outline-transparent transition-[outline_color] -outline-offset-1;

        &.enabled {
            @apply select-none rounded outline-1;

            &.highlight {
                @apply outline-foreground/30 outline-dashed;
            }

            &.selected {
                @apply outline-info outline;
            }
        }
    }
</style>