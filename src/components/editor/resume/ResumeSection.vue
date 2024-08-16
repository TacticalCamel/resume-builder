<script setup lang="ts" generic="T">
    import { computed, reactive } from "vue";
    import draggable from "vuedraggable";
    import IconInfo from "@/components/icons/IconInfo.vue";
    import InputText from "@/components/shared/InputText.vue";
    import { checkGroupMatch } from "@/models/BuildingBlock";
    import { settings } from "@/main";

    export interface SectionModel<T> {
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

    const model = defineModel<SectionModel<T>>({
        required: true
    });

    const outerGridStyle = computed(() => {
        return {
            'grid-template-columns': model.value.elements.length ? props.gridColumns : '1fr',
            'gap': `${props.gapY}rem ${props.gapX}rem`
        };
    });

    const innerGridStyle = reactive({
        'grid-column': `span ${props.subGridColumns} / span ${props.subGridColumns}`
    })
</script>

<template>
    <div v-if="settings.editable || model.elements.length" class="rounded-lg" :class="{'moveable': settings.editable}">
        <div class="max-w-[720px] mx-auto">
            <div class="flex flex-col items-start">
                <input-text v-model="model.title" placeholder="Section title" class="uppercase text-2xl"/>
            </div>

            <slot name="header"/>

            <transition-group>
                <draggable
                    v-model="model.elements"
                    item-key="id"
                    key="draggable"
                    drag-class="dragging"
                    ghost-class="ghost"
                    animation="200"
                    class="grid p-2 pe-0"
                    :disabled="!settings.editable"
                    :group="{name: group, pull: true, put: checkGroupMatch}"
                    :style="outerGridStyle"
                >
                    <template #item="{element, index}: {element: T, index: number}">
                        <div class="grid grid-cols-subgrid" :class="{'moveable': settings.editable}" :style="innerGridStyle">
                            <slot name="item" :element="element" :index="index"/>
                        </div>
                    </template>

                    <template #footer v-if="settings.editable && !model.elements.length">
                        <div class="flex gap-4 items-center justify-center outline-2 outline-dashed outline-secondary bg-secondary/5 rounded-lg text-secondary p-2 h-20">
                            <icon-info class="size-6"/>
                            <span>Empty section will not be displayed - drag items here to add content</span>
                        </div>
                    </template>
                </draggable>
            </transition-group>
        </div>
    </div>
</template>