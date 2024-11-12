<script setup lang="ts">
    import { Technology } from "@/models/resume/Technologies";
    import InputText from "@/components/shared/form/InputText.vue";
    import DraggableList from "@/components/shared/DraggableList.vue";
    import StylableElement from "@/components/shared/StylableElement.vue";

    const technologies = defineModel<Technology[]>({
        required: true
    });
</script>

<template>
    <draggable-list
        v-model="technologies"
        group="technology"
        class="flex flex-wrap gap-2 text-sm items-start"
    >
        <template #item="{element: technology}">
            <stylable-element :id="technology.id" type="technology">
                <div class="px-2 rounded bg-primary font-semibold text-nowrap">
                    <input-text v-model="technology.name" placeholder="Technology"/>
                </div>
            </stylable-element>
        </template>

        <template #empty>
            <span class="px-2">Drag technologies here</span>
        </template>
    </draggable-list>
</template>