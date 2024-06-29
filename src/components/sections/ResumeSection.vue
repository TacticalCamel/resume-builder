<script setup lang="ts" generic="T">
    import Draggable from "vuedraggable";
    import {inject, type PropType} from "vue";
    import type Section from "@/models/Section";
    import type SettingsModel from "@/models/SettingsModel";
    import SectionTitle from "@/components/shared/SectionTitle.vue";
    import IconDelete from "@/components/icons/IconDelete.vue";

    defineEmits<{
        onAdd: []
    }>();

    defineProps({
        enableDelete: {
            type: Boolean,
            required: false,
            default: true
        },
        display: {
            type: String as PropType<'table' | 'grid'>,
            required: false,
            default: 'table'
        },
        columns: {
            type: Number,
            required: false,
            default: 1
        }
    });

    const model = defineModel<Section<T>>({
        required: true
    });

    const settings = inject<SettingsModel>('settings', {} as SettingsModel);

    function deleteElement(index: number) {
        model.value.elements.splice(index, 1);
    }
</script>

<template>
    <div v-if="settings.editable || model.elements.length" :class="{'section-grid': display == 'grid'}">
        <section-title v-model="model.title" :display-warning="!model.elements.length" @on-add="$emit('onAdd')"/>

        <slot name="header"/>

        <table class="m-2 me-0">
            <transition-group>
                <draggable
                    v-model="model.elements"
                    item-key="id"
                    key="draggable"
                    :disabled="!settings.editable"
                    drag-class="dragging"
                    ghost-class="ghost"
                    animation="200"
                    tag="tbody"
                    :class="`grid-cols-${columns}`"
                >
                    <template #item="{element, index}">
                        <tr class="relative delete-glow">
                            <slot name="item" :element="element" :index="index"/>
                            <td v-if="settings.editable && enableDelete" class="p-0 ps-8 h-0 edit-controls">
                                <button @click="deleteElement(index)" class="block bg-opacity-20 bg-red-500 text-red-500 px-4 py-0.5 rounded delete hover:h-full hover:bg-opacity-0">
                                    <icon-delete class="size-5"/>
                                </button>
                            </td>
                        </tr>
                    </template>
                </draggable>
            </transition-group>
        </table>
    </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    tr .edit-controls {
        display: none;
    }

    tr:hover .edit-controls {
        display: table-cell;
    }

    tr:has(.editable:focus-within) .edit-controls {
        display: none;
    }

    .section-grid table, .section-grid tr, .section-grid td{
        display: block;
    }

    .section-grid tbody{
        display: grid;
        gap: 1rem;
    }
</style>