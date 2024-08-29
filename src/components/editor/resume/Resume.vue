<script setup lang="ts">
    import { provide } from "vue";
    import { canDragToList } from "@/models/BuildingBlock";
    import draggable from "vuedraggable";
    import ResumeModel from "@/models/resume/ResumeModel";
    import ISection from "@/models/interfaces/ISection";
    import HeaderSection from "@/components/editor/resume/HeaderSection.vue";

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
        <transition-group>
            <draggable
                v-model="resume.sections"
                item-key="id"
                key="draggable"
                class="grid max-w-[960px] mx-auto gap-12"
                :disabled="!editable"
                :group="{name: 'section', pull: true, put: canDragToList}"
                drag-class="dragging"
                ghost-class="ghost"
                animation="200"
            >
                <template #header>
                    <header-section v-model="resume.header"/>
                </template>

                <template #item="{element: section, index}: {element: ISection, index: number}">
                    <component :is="{...section.component}" v-model="resume.sections[index]"/>
                </template>
            </draggable>
        </transition-group>
    </div>
</template>