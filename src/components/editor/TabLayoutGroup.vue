<script setup lang="ts">
    import draggable from "vuedraggable";
    import { LayoutItem } from "@/models/bindings/LayoutItem";
    import { LayoutGroup } from "@/models/bindings/LayoutGroup";
    import EditorSidebarTabItem from "@/components/editor/EditorSidebarTabItem.vue";

    const {group} = defineProps<{
        group: LayoutGroup
    }>();
</script>

<template>
    <editor-sidebar-tab-item
        :icon="group.icon"
        :title="group.title"
    >
        <transition-group>
            <draggable
                item-key="id"
                key="draggable"
                class="element-group grid grid-cols-3 gap-2"
                drag-class="dragging"
                ghost-class="invisible"
                animation="200"
                :list="group.items"
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
    </editor-sidebar-tab-item>
</template>

<style lang="postcss" scoped>
    /* Only apply styles if the element is inside the container, so these styles are not applied when dragged elsewhere */
    .element-group .building-block {
        @apply h-12 grid rounded border-2 border-foreground/30 hover:border-foreground font-light;
    }
</style>