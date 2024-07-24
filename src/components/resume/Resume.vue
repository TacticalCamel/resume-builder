<script setup lang="ts">
    import draggable from "vuedraggable";
    import HeaderSection from "@/components/resume/HeaderSection.vue";
    import { sectionComponents, type SectionMap } from "@/models/SectionMap";
    import { checkGroupMatch } from "@/models/BuildingBlock";
    import { settings } from "@/main";
    import ResumeModel from "@/models/ResumeModel";

    const resume = defineModel<ResumeModel>({
        required: true
    })
</script>

<template>
    <div class="relative py-10 px-3">
        <transition-group>
            <draggable
                v-model="resume.sections"
                item-key="id"
                key="draggable"
                class="grid max-w-[960px] mx-auto"
                :disabled="!settings.editable"
                :group="{name: 'section', pull: true, put: checkGroupMatch}"
                drag-class="dragging"
                ghost-class="ghost"
                animation="200"
            >
                <template #header>
                    <header>
                        <header-section v-model="resume.header"/>
                    </header>
                </template>
                <template #item="{element: key}: {element: keyof SectionMap}">
                    <section class="rounded-lg" :class="{'moveable': settings.editable}">
                        <component :is="sectionComponents[key]" v-model="resume[key]" :id="`section-${key}`" class="max-w-[720px] mx-auto"/>
                    </section>
                </template>
            </draggable>
        </transition-group>
    </div>
</template>

<style scoped>
    header {
        padding-bottom: 4.5rem;
        margin-bottom: 0.5rem;
    }

    section:not(:last-child) > * {
        padding-bottom: 1.25rem;
        margin-bottom: 0.5rem;
    }

    section:not(:first-child) > * {
        padding-top: 1.25rem;
    }
</style>