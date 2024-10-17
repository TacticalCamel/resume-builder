<script setup lang="ts" generic="T">
    import { inject } from "vue";
    import { editableInjectorKey } from "@/keys";
    import draggable from "vuedraggable";

    defineProps<{
        group: string
        itemStyle?: Record<string, any>
    }>();

    defineOptions({
        inheritAttrs: false
    })

    const elements = defineModel<T[]>({
        required: true
    });

    const editable: boolean = inject(editableInjectorKey, false);

    // Check if the dragged element can be moved between 2 sortables.
    // The target group must match the source group or the group of the element.
    function canAcceptElement(targetSortable: any, sourceSortable: any, element: HTMLElement): boolean {
        const elementGroup: string | undefined = element.dataset.group;
        const sourceGroup: string | undefined = sourceSortable?.options?.group?.name;
        const targetGroup: string | undefined = targetSortable?.options?.group?.name;

        return elementGroup === targetGroup || sourceGroup === targetGroup;
    }
</script>

<template>
    <transition-group>
        <draggable
            v-model="elements"
            tag="ul"
            key="draggable"
            item-key="id"
            drag-class="dragging"
            ghost-class="ghost"
            animation="200"
            :disabled="!editable"
            :group="{name: group, pull: true, put: canAcceptElement}"
            v-bind="$attrs"
        >
            <template #header>
                <slot name="header"/>
            </template>

            <template #item="{element, index}: {element: T, index: number}">
                <li :style="itemStyle" class="empty:hidden" :class="{'moveable': editable}">
                    <slot name="item" :element="element" :index="index"/>
                </li>
            </template>

            <template #footer>
                <slot name="footer"/>
                <div v-if="editable && !elements.length" class="empty">
                    <slot name="empty"/>
                </div>
            </template>
        </draggable>
    </transition-group>
</template>

<style lang="postcss" scoped>
    .empty:has(+ .ghost) {
        @apply hidden;
    }

    .moveable {
        @apply relative cursor-move;
    }

    .moveable:has(.moveable:hover), .moveable:has(.editable:hover), .moveable.ghost {
        @apply cursor-auto;
    }

    .moveable::after {
        @apply content-[''] absolute rounded inset-0 -z-10 opacity-0 pointer-events-none bg-foreground/15 transition-opacity duration-100;
    }

    .moveable:hover::after {
        @apply opacity-100;
    }

    .moveable:has(.moveable:hover)::after, .moveable:has(.editable:hover)::after, .moveable.ghost::after {
        @apply opacity-0;
    }

    .moveable.dragging::after {
        @apply invisible;
    }
</style>