<script setup lang="ts">
    import type {Skill, SkillCategory, SkillSection} from "@/models/sections/Skill";
    import RatingBar from "@/components/shared/RatingBar.vue";
    import SectionTitle from "@/components/shared/SectionTitle.vue";
    import {inject, type PropType} from "vue";
    import EditText from "@/components/shared/EditText.vue";
    import IconAdd from "@/components/icons/IconAdd.vue";
    import IconDelete from "@/components/icons/IconDelete.vue";
    import IconMinus from "@/components/icons/IconMinus.vue";

    const model = defineModel({
        type: Object as PropType<SkillSection>,
        required: true
    });

    const editable = inject<boolean>('isEditMode', false);

    function addCategory() {
        model.value.categories.push({
            name: "New Category",
            skills: []
        });
    }

    function deleteCategory(index: number) {
        model.value.categories.splice(index, 1);
    }

    function addSkill(category: SkillCategory) {
        category.skills.push({
            name: "New Skill",
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
    <div class="text-nowrap">
        <section-title v-model="model.title" :display-warning="!model.categories.length" @on-add="addCategory"/>

        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 m-2 me-0">
            <section v-for="(category, index) in model.categories" :key="category.name" class="flex flex-col size-min delete-glow">
                <div class="flex items-center">
                    <div class="add-glow flex items-center">
                        <edit-text v-model="category.name" class="text-lg pb-0.5"/>
                        <button v-if="editable" @click="addSkill(category)" class="ms-4 me-2 bg-opacity-20 bg-green-500 text-green-500 py-0.5 px-2 rounded add hover:bg-opacity-0">
                            <icon-add class="size-5"/>
                        </button>
                    </div>
                    <button v-if="editable" @click="deleteCategory(index)" class="bg-opacity-20 bg-red-500 text-red-500 py-0.5 px-2 rounded delete hover:bg-opacity-0">
                        <icon-delete class="size-5"/>
                    </button>
                </div>

                <div v-for="skill in category.skills" :key="skill.name" class="flex py-0.5 items-center">
                    <div class="ps-0.5 pe-3">
                        <rating-bar :value="skill.level"/>
                    </div>
                    <edit-text v-model="skill.name" class="font-light"/>
                    <div v-if="editable" class="ms-auto flex">
                        <button @click="decreaseSkillLevel(skill)" class="bg-opacity-0 hover:bg-opacity-20 bg-red-500 text-red-500 py-0.5 px-1 rounded transition-all">
                            <icon-minus class="size-5"/>
                        </button>
                        <button @click="increaseSkillLevel(skill)" class="bg-opacity-0 hover:bg-opacity-20 bg-green-500 text-green-500 py-0.5 px-1 rounded transition-all">
                            <icon-add class="size-5"/>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>