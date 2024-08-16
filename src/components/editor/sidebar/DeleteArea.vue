<script setup lang="ts">
    import { ref } from "vue";
    import draggable from "vuedraggable";

    const sink = ref<unknown[]>([]);
</script>

<template>
    <draggable
        v-model="sink"
        item-key="id"
        :group="{name: 'delete', pull: false, put: true}"
        class="delete-area"
        ghost-class="delete-item"
        @add="sink.pop()"
    >
        <template #header>
            <div class="delete-text flex items-center">
                <span class="text-error">Drag items here to delete</span>
            </div>
        </template>
        <template #item="{element}">
            <div>{{ element }}</div>
        </template>
    </draggable>
</template>

<!--suppress CssUnusedSymbol -->
<style lang="postcss" scoped>
    .delete-area {
        @apply flex justify-center items-center border-2 border-dashed border-error rounded p-2 h-24;
        @apply transition-colors bg-error/5;
    }

    .delete-area:has(> .delete-item) {
        @apply bg-error/20;
    }

    .delete-area > :not(.delete-text) {
        @apply hidden;
    }
</style>