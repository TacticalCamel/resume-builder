<script setup lang="ts">
    import {inject} from "vue";
    import draggable from "vuedraggable";
    import type Skill from "@/models/elements/Skill";
    import type SkillSection from "@/models/sections/SkillSection";
    import type SkillCategory from "@/models/elements/SkillCategory";
    import type SettingsModel from "@/models/SettingsModel";
    import RatingBar from "@/components/shared/RatingBar.vue";
    import EditText from "@/components/shared/EditText.vue";
    import IconPlus from "@/components/icons/IconPlus.vue";
    import IconDecrease from "@/components/icons/IconDecrease.vue";
    import IconIncrease from "@/components/icons/IconIncrease.vue";
    import ResumeSection from "@/components/sections/ResumeSection.vue";

    const model = defineModel<SkillSection>({
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
                        <icon-plus class="size-5"/>
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
                                    <icon-decrease class="size-4"/>
                                </button>
                                <button @click="increaseSkillLevel(skill)" class="bg-opacity-0 hover:bg-opacity-20 bg-green-300 text-green-300 py-0.5 px-1 rounded transition-all">
                                    <icon-increase class="size-4"/>
                                </button>
                            </div>
                        </div>
                    </template>
                </draggable>
            </transition-group>

        </template>
    </resume-section>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
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

    .skill-row:hover .skill-row-edit-controls {
        opacity: 1;
        transition: opacity 150ms;
    }

    .skill-row:has(.editable:focus-within) .skill-row-edit-controls {
        opacity: 0;
        display: none;
    }
</style>