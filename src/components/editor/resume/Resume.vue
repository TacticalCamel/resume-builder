<script setup lang="ts">
    import { provide } from "vue";
    import HeaderSection from "@/components/editor/resume/sections/HeaderSection.vue";
    import DraggableList from "@/components/editor/resume/generic/DraggableList.vue";
    import { ISection, ResumeModel } from "@/models/resume/Resume";

    const resume = defineModel<ResumeModel>({
        required: true
    });

    const props = defineProps({
        editable: {
            type: Boolean,
            default: false
        }
    });

    provide<boolean>('editable', props.editable);
</script>

<template>
    <div class="relative py-10 px-3">
        <draggable-list
            v-model="resume.sections"
            group="section"
            class="grid max-w-[960px] mx-auto gap-12"
        >
            <template #header>
                <header-section v-model="resume.header"/>
            </template>

            <template #item="{element: section, index}: {element: ISection, index: number}">
                <component :is="{...section.component}" v-model="resume.sections[index]"/>
            </template>

            <template #empty>
                <div class="list-placeholder h-40">Drag sections here</div>
            </template>
        </draggable-list>
    </div>
</template>