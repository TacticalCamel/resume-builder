<script setup lang="ts">
    import {inject, type PropType} from "vue";
    import draggable from "vuedraggable";
    import type Skill from "@/models/elements/Skill";
    import type SkillSection from "@/models/sections/SkillSection";
    import type SkillCategory from "@/models/elements/SkillCategory";
    import type SettingsModel from "@/models/SettingsModel";
    import RatingBar from "@/components/shared/RatingBar.vue";
    import EditText from "@/components/shared/EditText.vue";
    import IconAdd from "@/components/icons/IconAdd.vue";
    import IconDelete from "@/components/icons/IconDelete.vue";
    import IconArrowDown from "@/components/icons/IconArrowDown.vue";
    import IconArrowUp from "@/components/icons/IconArrowUp.vue";
    import ResumeSection from "@/components/sections/ResumeSection.vue";

    const model = defineModel({
        type: Object as PropType<SkillSection>,
        required: true
    });

    const settings = inject<SettingsModel>('settings', {} as SettingsModel);

    function addCategory() {
        model.value.elements.push({
            title: '',
            elements: []
        });
    }

    function addSkill(category: SkillCategory) {
        category.elements.push({
            name: '',
            level: 0
        });
    }

    function decreaseSkillLevel(skill: Skill) {
        skill.level = Math.min(5, Math.max(0, skill.level - 1));
    }

    function increaseSkillLevel(skill: Skill) {
        skill.level = Math.min(5, Math.max(0, skill.level + 1));
    }

    function deleteSkill(category: SkillCategory, index: number) {
        category.elements.splice(index, 1);
    }

    function deleteCategory(index: number) {
        model.value.elements.splice(index, 1);
    }
</script>

<template>
    <resume-section v-model="model" :display="'grid'" :columns="2" @on-add="addCategory" :enable-delete="false">
        <template #item="{element: category, index}: {element: SkillCategory, index: number}">
            <div class="flex items-center category-title outline-transparent">
                <div class="add-glow flex items-center">
                    <edit-text v-model="category.title" class="text-lg pb-0.5"/>
                </div>

                <div v-if="settings.editable" class="ms-auto ps-8 flex gap-x-1">
                    <button @click="addSkill(category)" class="bg-opacity-20 bg-green-500 text-green-500 py-0.5 px-2 rounded add hover:bg-opacity-0">
                        <icon-add class="size-5"/>
                    </button>
                    <button @click="deleteCategory(index)" class="bg-opacity-20 bg-red-500 text-red-500 py-0.5 px-2 rounded hover:bg-opacity-0 delete">
                        <icon-delete class="size-5"/>
                    </button>
                </div>
            </div>

            <transition-group>
                <draggable
                    v-model="category.elements"
                    item-key="id"
                    key="draggable"
                    :disabled="!settings.editable"
                    drag-class="dragging"
                    ghost-class="ghost"
                    animation="200"
                >
                    <template #item="{element: skill, index}: {element: Skill, index: number}">
                        <div class="flex py-0.5 items-center skill-row">
                            <div class="ps-0.5 pe-3">
                                <rating-bar :value="skill.level"/>
                            </div>
                            <edit-text v-model="skill.name" class="font-light"/>

                            <div v-if="settings.editable" class="ms-auto flex opacity-0 ps-3 gap-x-0.5 skill-row-edit-controls">
                                <button @click="decreaseSkillLevel(skill)" class="bg-opacity-0 hover:bg-opacity-20 bg-red-300 text-red-300 py-0.5 px-1 rounded transition-all">
                                    <icon-arrow-down class="size-4"/>
                                </button>
                                <button @click="increaseSkillLevel(skill)" class="bg-opacity-0 hover:bg-opacity-20 bg-green-300 text-green-300 py-0.5 px-1 rounded transition-all">
                                    <icon-arrow-up class="size-4"/>
                                </button>
                                <button @click="deleteSkill(category, index)" class="bg-opacity-20 hover:bg-opacity-0 bg-red-500 text-red-500 py-0.5 px-1 rounded delete-item">
                                    <icon-delete class="size-5"/>
                                </button>
                            </div>
                        </div>
                    </template>
                </draggable>
            </transition-group>

        </template>
    </resume-section>
</template>

<style scoped>
    .skill-row {
        outline: 0 solid transparent;
    }

    .skill-row:has(.delete-item:hover) {
        outline: 1px solid rgb(239, 68, 68);
        border-radius: 0.25em;
        background-color: rgba(239, 68, 68, 0.2);
        transition: color, background-color, outline-color 150ms;
    }

    .category-title:has(.add:hover) {
        outline: 1px solid rgb(34, 197, 94);
        border-radius: 0.25em;
        background-color: rgba(34, 197, 94, 0.2);
        transition: color, background-color, outline-color 150ms;
        align-items: stretch;
    }

    .category-title button {
        opacity: 0;
    }

    .category-title:hover button {
        opacity: 1;
        transition: opacity 150ms;
    }

    .category-title:focus-within button {
        display: none;
    }

    .category-title:has(.add:hover) .delete, .category-title:has(.delete:hover) .add {
        filter: saturate(0);
    }

    .skill-row:hover .skill-row-edit-controls {
        opacity: 1;
        transition: opacity 150ms;
    }

    .skill-row:has(.editable:focus-within) .skill-row-edit-controls {
        opacity: 0;
        display: none;
    }
</style>