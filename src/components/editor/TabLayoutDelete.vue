<script setup lang="ts">
    import { ref } from "vue";
    import draggable from "vuedraggable";
    import EditorSidebarTabItem from "@/components/editor/EditorSidebarTabItem.vue";
    import IconDelete from "@/components/shared/IconDelete.vue";

    const sink = ref<unknown[]>([]);
</script>

<template>
    <editor-sidebar-tab-item title="delete elements">
        <div class="relative">
            <draggable
                v-model="sink"
                item-key="id"
                :group="{name: 'delete', pull: false, put: true}"
                class="delete-area"
                @add="sink.pop()"
            >
                <template #item="{element}">
                    <div>{{ element }}</div>
                </template>
            </draggable>

            <div class="absolute inset-0 flex gap-4 items-center justify-center text-error select-none">
                <icon-delete class="size-6"/>
                <span class="font-medium">Drag elements here to delete</span>
            </div>
        </div>
    </editor-sidebar-tab-item>
</template>

<style lang="postcss" scoped>
    .delete-area {
        @apply flex justify-center items-center rounded bg-error/10 border border-dashed border-error p-2 h-20 transition-colors;

        &:empty {
            @apply bg-transparent;
        }

        & > * {
            @apply hidden;
        }
    }
</style>