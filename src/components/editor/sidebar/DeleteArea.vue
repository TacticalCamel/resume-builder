<script setup lang="ts">
    import { ref } from "vue";
    import draggable from "vuedraggable";
    import IconDelete from "@/components/icons/IconDelete.vue";

    const sink = ref<unknown[]>([]);
</script>

<template>
    <draggable
        v-model="sink"
        item-key="id"
        :group="{name: 'delete', pull: false, put: true}"
        class="delete-area flex justify-center items-center border-2 border-dashed border-error/70 rounded bg-error/5 p-2 h-20 transition-colors select-none"
        ghost-class="delete-item"
        @add="sink.pop()"
    >
        <template #header>
            <div class="flex gap-4 items-center justify-center text-error">
                <icon-delete class="size-8"/>
                <span class="text-sm">Drag elements here to delete</span>
            </div>
        </template>
        <template #item="{element}">
            <div>{{ element }}</div>
        </template>
    </draggable>
</template>

<!--suppress CssUnusedSymbol -->
<style lang="postcss" scoped>
    .delete-area:has(> .delete-item) {
        @apply bg-error/15 border-error/90;
    }

    .delete-area > :not(:first-child) {
        @apply hidden;
    }
</style>