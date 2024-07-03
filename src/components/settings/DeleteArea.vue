<script setup lang="ts">
    import {ref} from "vue";
    import draggable from "vuedraggable";
    import IconDelete from "@/components/icons/settings/IconDelete.vue";

    const sink = ref<any[]>([]);
</script>

<template>
    <draggable
        v-model="sink"
        item-key="id"
        :group="{name: 'delete', pull: false, put: true}"
        class="flex justify-center items-center border-2 border-dashed border-error rounded-lg p-2 h-20 delete-area bg-error bg-opacity-10 transition-colors"
        ghost-class="delete-item"
        @add="sink.pop()"
    >
        <template #item="{element}">
            <div>{{ element }}</div>
        </template>
        <template #header>
            <div class="delete-text flex items-center gap-2 text-error">
                <icon-delete class="size-6"/>
                <span>Drag items here to delete</span>
            </div>
        </template>
    </draggable>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .delete-area > * {
        position: absolute;
        opacity: 0;
    }

    .delete-area > .delete-text {
        position: relative;
        opacity: 1;
    }

    .delete-area:has(> .delete-item) {
        @apply bg-opacity-30;
    }
</style>