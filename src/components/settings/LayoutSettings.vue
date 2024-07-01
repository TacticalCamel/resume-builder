<script setup lang="ts">
    import {ref} from "vue";
    import draggable from "vuedraggable";
    import type SettingsModel from "@/models/SettingsModel";
    import Draggable from "vuedraggable";
    import IconDelete from "@/components/icons/IconDelete.vue";

    const settings = defineModel<SettingsModel>('settings', {
        required: true
    });

    const test = ref(['test1', 'test2', 'test3']);

    const sink = ref<any[]>([]);
</script>

<template>
    <div class="flex flex-col gap-4 min-w-80">
        <div class="pb-1 text-xl">Elements</div>
        <transition-group>
            <draggable
                v-model="test"
                item-key="id"
                key="draggable"
                :group="{name: 'contacts', pull: 'clone'}"
                class="border-2 border-dashed border-sky-500 w-80 rounded-lg flex flex-wrap flex-row gap-2 size-full p-2 items-start justify-start"
                drag-class="dragging"
                ghost-class="ghost"
                animation="200"
            >
                <template #item="{element}: {element: string}">
                    <div class="item rounded bg-opacity-20 bg-sky-500 border border-sky-500">{{ element }}</div>
                </template>
            </draggable>
        </transition-group>

        <draggable
            v-model="sink"
            item-key="id"
            key="draggable"
            :group="{pull: false, put: true}"
            class="border-2 border-dashed border-red-500 w-80 h-24 rounded-lg flex flex-wrap flex-row gap-2 size-full p-2 justify-center"
            ghost-class="del"
            @add="sink.pop()"
        >
            <template #item="{element}">
                <div class="item rounded bg-opacity-20 bg-sky-500 border border-sky-500">{{ element }}</div>
            </template>
            <template #header>
                <icon-delete class="size-6 text-red-500 absolute"/>
            </template>
        </draggable>
    </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .item{
        padding: 1px 0.5em;
    }

    *:has(> .del){
        @apply bg-red-500 bg-opacity-20;
    }
</style>