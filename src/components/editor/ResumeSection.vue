<script setup lang="ts" generic="T extends UniqueId">
    import { computed } from "vue";
    import { useEditor } from "@/composables/useEditor";
    import { Section } from "@/models/resume/Resume";
    import { UniqueId } from "@/models/UniqueId";
    import InputText from "@/components/shared/InputText.vue";
    import DraggableList from "@/components/editor/DraggableList.vue";
    import StylableElement from "@/components/editor/StylableElement.vue";

    const {group, gridColumns = 'min-content', subGridColumns = 1, gapX = 0, gapY = 0} = defineProps<{
        group: string,
        gridColumns?: string,
        subGridColumns?: number,
        gapX?: number,
        gapY?: number
    }>();

    const section = defineModel<Section<T>>({
        required: true
    });

    const {editable} = useEditor();

    const outerGridStyle = computed(() => ({
        gridTemplateColumns: section.value.elements.length ? gridColumns : '1fr',
        gap: `${gapY}rem ${gapX}rem`
    }));

    const innerGridStyle = computed(() => ({
        display: 'grid',
        gridTemplateColumns: 'subgrid',
        gridColumn: `span ${subGridColumns} / span ${subGridColumns}`,
    }));
</script>

<template>
    <stylable-element v-if="editable || section.elements.length" class="print:break-inside-avoid" type="section" :id="section.id">
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
                    <stylable-element :type="group" :id="element.id" :style="innerGridStyle">
                        <slot name="item" :element="element" :index="index"/>
                    </stylable-element>
                </template>

                <template #empty>
                    <span class="py-4">Drag section elements here</span>
                </template>
            </draggable-list>
        </div>
    </stylable-element>
</template>