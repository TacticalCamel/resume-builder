<script setup lang="ts">
    import { Technology } from "@/models/resume/Technologies";
    import InputText from "@/components/shared/form/InputText.vue";
    import DraggableList from "@/components/editor/resume/generic/DraggableList.vue";

    const technologies = defineModel<Technology[]>({
        required: true
    });
</script>

<template>
    <draggable-list
        v-model="technologies"
        group="Technology"
        class="flex flex-wrap gap-2 text-sm items-start"
    >
        <template #item="{element: technology}">
            <div class="px-2 rounded bg-primary font-semibold transition-all text-nowrap">
                <input-text v-model="technology.name" placeholder="Technology"/>
            </div>
        </template>

        <template #empty>
            <div class="list-placeholder px-2">Drag technologies here</div>
        </template>
    </draggable-list>
</template>