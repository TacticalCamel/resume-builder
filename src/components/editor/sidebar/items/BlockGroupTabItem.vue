<script setup lang="ts">
    import draggable from "vuedraggable";
    import { LayoutItem } from "@/models/bindings/LayoutItem";
    import { LayoutGroup } from "@/models/bindings/LayoutGroup";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";

    const {icon, title, items} = defineProps<LayoutGroup>();
</script>

<template>
    <editor-tab-item
        :icon="icon"
        :title="title"
    >
        <transition-group>
            <draggable
                :list="items"
                item-key="id"
                key="draggable"
                class="block-group grid grid-cols-3 gap-2 text-sm"
                drag-class="dragging"
                ghost-class="invisible"
                animation="200"
                :sort="false"
                :group="{pull: 'clone', put: false}"
                :clone="(item: LayoutItem) => item.clone()"
            >
                <template #item="{element: item}: {element: LayoutItem}">
                    <div :data-group="item.group">
                        <div class="building-block flex items-center justify-center px-1 text-foreground/70 hover:text-foreground transition-colors cursor-move min-w-20">
                            {{ item.name }}
                        </div>
                    </div>
                </template>
            </draggable>
        </transition-group>
    </editor-tab-item>
</template>

<style lang="postcss" scoped>
    /* Only apply styles if the element is inside the container, so these styles are not applied when dragged elsewhere */
    .block-group .building-block {
        @apply h-12 grid rounded border-2 border-foreground/30 hover:border-foreground font-light;
    }
</style>