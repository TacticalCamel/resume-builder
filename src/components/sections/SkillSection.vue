<script setup lang="ts">
    import type {Skill, SkillCategory, SkillSection} from "@/models/Skill";
    import RatingBar from "@/components/shared/RatingBar.vue";
    import SectionTitle from "@/components/shared/SectionTitle.vue";
    import {inject, type PropType} from "vue";
    import EditText from "@/components/shared/EditText.vue";
    import IconAdd from "@/components/icons/IconAdd.vue";
    import IconDelete from "@/components/icons/IconDelete.vue";
    import IconArrowDown from "@/components/icons/IconArrowDown.vue";
    import IconArrowUp from "@/components/icons/IconArrowUp.vue";

    const model = defineModel({
        type: Object as PropType<SkillSection>,
        required: true
    });

    const editable = inject<boolean>('isEditMode', false);

    function addCategory() {
        model.value.categories.push({
            name: '',
            skills: []
        });
    }

    function deleteCategory(index: number) {
        model.value.categories.splice(index, 1);
    }

    function addSkill(category: SkillCategory) {
        category.skills.push({
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
        category.skills.splice(index, 1);
    }
</script>

<template>
    <div v-if="editable || model.categories.length">
        <section-title v-model="model.title" :display-warning="!model.categories.length" @on-add="addCategory"/>

        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 m-2 me-0 text-nowrap">
            <section v-for="(category, index) in model.categories" :key="category.name" class="flex flex-col size-min delete-category-glow">
                <div class="flex items-center category-title outline-transparent">
                    <div class="add-glow flex items-center">
                        <edit-text v-model="category.name" class="text-lg pb-0.5"/>
                    </div>

                    <div v-if="editable" class="ms-auto ps-8 flex gap-x-1">
                        <button @click="addSkill(category)" class="bg-opacity-20 bg-green-500 text-green-500 py-0.5 px-2 rounded add hover:bg-opacity-0">
                            <icon-add class="size-5"/>
                        </button>
                        <button @click="deleteCategory(index)" class="bg-opacity-20 bg-red-500 text-red-500 py-0.5 px-2 rounded hover:bg-opacity-0 delete-category">
                            <icon-delete class="size-5"/>
                        </button>
                    </div>
                </div>

                <div v-for="(skill, index) in category.skills" :key="skill.name" class="flex py-0.5 items-center delete-glow skill-row">
                    <div class="ps-0.5 pe-3">
                        <rating-bar :value="skill.level"/>
                    </div>
                    <edit-text v-model="skill.name" class="font-light"/>

                    <div v-if="editable" class="ms-auto flex opacity-0 ps-3 gap-x-0.5 skill-row-edit-controls">
                        <button @click="decreaseSkillLevel(skill)" class="bg-opacity-0 hover:bg-opacity-20 bg-red-300 text-red-300 py-0.5 px-1 rounded transition-all">
                            <icon-arrow-down class="size-4"/>
                        </button>
                        <button @click="increaseSkillLevel(skill)" class="bg-opacity-0 hover:bg-opacity-20 bg-green-300 text-green-300 py-0.5 px-1 rounded transition-all">
                            <icon-arrow-up class="size-4"/>
                        </button>
                        <button @click="deleteSkill(category, index)" class="bg-opacity-20 hover:bg-opacity-0 bg-red-500 text-red-500 py-0.5 px-1 rounded delete">
                            <icon-delete class="size-5"/>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
    .delete-category-glow {
        outline: 0 solid transparent;
    }

    .delete-category-glow:has(.delete-category:hover) {
        outline: 1px solid rgb(239, 68, 68);
        border-radius: 0.25em;
        background-color: rgba(239, 68, 68, 0.2);
        transition: color, background-color, outline-color 150ms;
    }

    .category-title:has(.add:hover){
        outline: 1px solid rgb(34, 197, 94);
        border-radius: 0.25em;
        background-color: rgba(34, 197, 94, 0.2);
        transition: color, background-color, outline-color 150ms;
        align-items: stretch;
    }

    .category-title button{
        opacity: 0;
    }

    .category-title:hover button{
        opacity: 1;
        transition: opacity 150ms;
    }

    .category-title:focus-within button{
        display: none;
    }

    .category-title:has(.add:hover) .delete-category, .category-title:has(.delete-category:hover) .add{
        filter: saturate(0);
    }

    .skill-row:hover .skill-row-edit-controls{
        opacity: 1;
        transition: opacity 150ms;
    }

    .skill-row:has(.editable:focus-within) .skill-row-edit-controls{
        opacity: 0;
        display: none;
    }
</style>