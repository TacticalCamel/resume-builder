<script setup lang="ts">
    import { inject } from "vue";
    import draggable from "vuedraggable";
    import RatingBar from "@/components/editor/resume/RatingBar.vue";
    import InputText from "@/components/shared/InputText.vue";
    import IconDecrease from "@/components/icons/IconDecrease.vue";
    import IconIncrease from "@/components/icons/IconIncrease.vue";
    import ResumeSection, { SectionModel } from "@/components/editor/resume/ResumeSection.vue";
    import {checkGroupMatch} from "@/models/BuildingBlock";

    export interface SkillList extends SectionModel<SkillCategory>{
        title: string
        elements: SkillCategory[]
    }

    export interface SkillCategory{
        title: string
        elements: Skill[]
    }

    export interface Skill {
        name: string
        level: number
    }

    const model = defineModel<SkillList>({
        required: true
    });

    const editable = inject<boolean>('editable', false);

    const maxSkillLevel: number = 5;

    function decreaseSkillLevel(skill: Skill) {
        skill.level = Math.min(maxSkillLevel, Math.max(0, skill.level - 1));
    }

    function increaseSkillLevel(skill: Skill) {
        skill.level = Math.min(maxSkillLevel, Math.max(0, skill.level + 1));
    }
</script>

<template>
    <resume-section
        v-model="model"
        group="skill-category"
        grid-columns="1fr 1fr"
        :gap-x="2"
        :gap-y="1"
    >
        <template #item="{element: category}: {element: SkillCategory}">
            <div>
                <div class="text-lg pb-0.5">
                    <input-text v-model="category.title" placeholder="Category name"/>
                </div>

                <transition-group>
                    <draggable
                        v-model="category.elements"
                        item-key="id"
                        key="draggable"
                        drag-class="dragging"
                        ghost-class="ghost"
                        animation="200"
                        :disabled="!editable"
                        :group="{name: 'skill', pull: true, put: checkGroupMatch}"
                    >
                        <template #item="{element: skill}: {element: Skill}">
                            <div class="flex gap-3 p-0.5 text-nowrap items-center skill-row" :class="{'moveable': editable}">
                                <rating-bar :value="skill.level" :max="maxSkillLevel"/>

                                <input-text v-model="skill.name" class="font-light skill-text" placeholder="Skill name"/>

                                <div v-if="editable" class="ms-auto flex gap-1 skill-row-edit-controls">
                                    <button @click="decreaseSkillLevel(skill)" class="bg-transparent hover:bg-error/20 text-error py-0.5 px-1.5 rounded transition-all">
                                        <icon-decrease class="size-4"/>
                                    </button>
                                    <button @click="increaseSkillLevel(skill)" class="bg-transparent hover:bg-success/20 text-success py-0.5 px-1.5 rounded transition-all">
                                        <icon-increase class="size-4"/>
                                    </button>
                                </div>
                            </div>
                        </template>
                    </draggable>
                </transition-group>
            </div>
        </template>
    </resume-section>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .skill-row .skill-row-edit-controls {
        opacity: 0;
        transition: opacity 150ms;
    }

    .skill-row:hover .skill-row-edit-controls {
        opacity: 1;
    }

    .skill-row:has(.skill-text:focus-within) .skill-row-edit-controls {
        opacity: 0;
    }
</style>