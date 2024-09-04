<script setup lang="ts" generic="T">
    import { computed, inject, reactive } from "vue";
    import InputText from "@/components/shared/form/InputText.vue";
    import DraggableList from "@/components/editor/resume/generic/DraggableList.vue";

    interface SectionModel<T> {
        title: string
        elements: T[]
    }

    const props = defineProps({
        group: {
            type: String,
            required: true
        },
        gridColumns: {
            type: String,
            default: 'min-content'
        },
        subGridColumns: {
            type: Number,
            default: 1
        },
        gapX: {
            type: Number,
            default: 0
        },
        gapY: {
            type: Number,
            default: 0
        }
    });

    const section = defineModel<SectionModel<T>>({
        required: true
    });

    const outerGridStyle = computed(() => {
        return {
            gridTemplateColumns: section.value.elements.length ? props.gridColumns : '1fr',
            gap: `${props.gapY}rem ${props.gapX}rem`
        };
    });

    const innerGridStyle = reactive({
        display: 'grid',
        gridTemplateColumns: 'subgrid',
        gridColumn: `span ${props.subGridColumns} / span ${props.subGridColumns}`,
    });

    const editable = inject<boolean>('editable', false);
</script>

<template>
    <div v-if="editable || section.elements.length" class="rounded-lg print:break-inside-avoid">
        <div class="max-w-[720px] mx-auto">
            <div class="flex flex-col items-start">
                <input-text v-model="section.title" placeholder="Section title" class="uppercase text-2xl"/>
            </div>

            <slot name="header"/>

            <draggable-list
                v-model="section.elements"
                :group="group"
                class="grid p-2 pe-0"
                :style="outerGridStyle"
                :item-style="innerGridStyle"
            >
                <template #item="{element, index}: {element: T, index: number}">
                    <slot name="item" :element="element" :index="index"/>
                </template>

                <template #empty>
                    <div class="list-placeholder h-12">
                        Drag section elements here
                    </div>
                </template>
            </draggable-list>
        </div>
    </div>
</template>