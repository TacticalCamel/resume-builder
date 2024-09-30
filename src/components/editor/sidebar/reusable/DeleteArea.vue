<script setup lang="ts">
    import { ref } from "vue";
    import draggable from "vuedraggable";
    import IconDelete from "@/components/shared/icons/IconDelete.vue";

    const sink = ref<unknown[]>([]);
</script>

<template>
    <div class="relative">
        <draggable
            v-model="sink"
            item-key="id"
            :group="{name: 'delete', pull: false, put: true}"
            class="delete-area flex justify-center items-center rounded border-2 border-dashed border-error/90 empty:border-error/70 bg-error/15 empty:bg-error/5 p-2 h-20 transition-colors"
            ghost-class="delete-item"
            @add="sink.pop()"
        >
            <template #item="{element}">
                <div>{{ element }}</div>
            </template>
        </draggable>

        <div class="absolute inset-0 flex gap-4 items-center justify-center text-error select-none">
            <icon-delete class="size-8"/>
            <span>Drag elements here to delete</span>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
    .delete-area * {
        @apply hidden;
    }
</style>