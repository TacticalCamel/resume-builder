<script setup lang="ts">
    import { provide } from "vue";
    import { useSectionViews } from "@/composables/SectionViews";
    import { editableInjectionKey } from "@/main";
    import { ResumeModel, Section } from "@/models/resume/Resume";
    import HeaderSection from "@/components/editor/resume/sections/HeaderSection.vue";
    import DraggableList from "@/components/editor/resume/generic/DraggableList.vue";

    const {getSectionView} = useSectionViews();

    const resume = defineModel<ResumeModel>({
        required: true
    });

    const {editable = false} = defineProps<{
        editable?: boolean
    }>();

    provide<boolean>(editableInjectionKey, editable);
</script>

<template>
    <div class="relative py-10 px-3">
        <draggable-list
            v-model="resume.sections"
            group="Section"
            class="grid max-w-[960px] mx-auto gap-12"
        >
            <template #header>
                <header-section v-model="resume.header"/>
            </template>

            <template #item="{element: section, index}: {element: Section, index: number}">
                <component :is="getSectionView(section.type).component" v-model="resume.sections[index]"/>
            </template>

            <template #empty>
                <div class="list-placeholder h-40">Drag sections here</div>
            </template>
        </draggable-list>
    </div>
</template>