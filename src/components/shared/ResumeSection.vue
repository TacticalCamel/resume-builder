<script setup lang="ts" generic="T">
    import {inject, type PropType} from "vue";
    import draggable from "vuedraggable";
    import type Section from "@/models/Section";
    import type SettingsModel from "@/models/SettingsModel";
    import IconInfo from "@/components/icons/IconInfo.vue";
    import EditText from "@/components/shared/EditText.vue";
    import {checkGroupMatch} from "@/models/BuildingBlock";

    const settings = inject<SettingsModel>('settings', {} as SettingsModel);

    defineProps({
        group: {
            type: String,
            required: true
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
</script>

<template>
    <div v-if="settings.editable || model.elements.length" :class="{'section-grid': display == 'grid'}">
        <div class="flex flex-col items-start">
            <edit-text v-model="model.title" class="uppercase text-2xl"/>
        </div>

        <slot name="header"/>

        <table class="m-2 me-0">
            <transition-group>
                <draggable
                    v-model="model.elements"
                    item-key="id"
                    key="draggable"
                    :disabled="!settings.editable"
                    :group="{name: group, pull: true, put: checkGroupMatch}"
                    drag-class="dragging"
                    ghost-class="ghost"
                    animation="200"
                    tag="tbody"
                    :class="`grid-cols-${columns}`"
                >
                    <template #item="{element, index}: {element: T, index: number}">
                        <tr class="relative delete-glow">
                            <slot name="item" :element="element" :index="index"/>
                        </tr>
                    </template>

                    <template #footer v-if="settings.editable && !model.elements.length">
                        <div class="flex items-center text-cyan-500 bg-cyan-500 bg-opacity-20 px-2 py-1 rounded mt-2">
                            <icon-info class="size-6 me-2"/>
                            <span>Empty section will not be displayed</span>
                        </div>
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

    .section-grid table, .section-grid tr, .section-grid td {
        display: block;
    }

    .section-grid tbody {
        display: grid;
        gap: 1rem;
    }
</style>