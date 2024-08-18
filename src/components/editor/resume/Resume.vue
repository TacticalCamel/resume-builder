<script setup lang="ts">
    import { provide } from "vue";
    import draggable from "vuedraggable";
    import { sectionComponents, type SectionMap } from "@/models/SectionMap";
    import { checkGroupMatch } from "@/models/BuildingBlock";
    import HeaderSection from "@/components/editor/resume/HeaderSection.vue";
    import ResumeModel from "@/models/ResumeModel";

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
                :group="{name: 'section', pull: true, put: checkGroupMatch}"
                drag-class="dragging"
                ghost-class="ghost"
                animation="200"
            >
                <template #header>
                    <header-section v-model="resume.header"/>
                </template>
                <template #item="{element: key}: {element: keyof SectionMap}">
                    <component :is="sectionComponents[key]" v-model="resume[key]"/>
                </template>
            </draggable>
        </transition-group>
    </div>
</template>