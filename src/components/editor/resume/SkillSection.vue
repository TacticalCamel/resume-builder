<script setup lang="ts">
    import { inject } from "vue";
    import RatingBar from "@/components/editor/resume/RatingBar.vue";
    import InputText from "@/components/shared/InputText.vue";
    import IconDecrease from "@/components/icons/IconDecrease.vue";
    import IconIncrease from "@/components/icons/IconIncrease.vue";
    import ResumeSection from "@/components/editor/resume/ResumeSection.vue";
    import { Skill, SkillCategory, SkillList } from "@/models/resume/Skills";
    import DraggableList from "@/components/editor/resume/DraggableList.vue";

    const skills = defineModel<SkillList>({
        required: true
    });

    const editable = inject<boolean>('editable', false);

    function decreaseSkillLevel(skill: Skill) {
        skill.level = Math.min(skills.value.maxLevel, Math.max(0, skill.level - 1));
    }

    function increaseSkillLevel(skill: Skill) {
        skill.level = Math.min(skills.value.maxLevel, Math.max(0, skill.level + 1));
    }
</script>

<template>
    <resume-section
        v-model="skills"
        :group="SkillCategory.draggableCategory"
        grid-columns="1fr 1fr"
        :gap-x="2"
        :gap-y="1"
    >
        <template #item="{element: category}: {element: SkillCategory}">
            <div>
                <div class="text-lg pb-0.5">
                    <input-text v-model="category.title" placeholder="Category name"/>
                </div>

                <draggable-list
                    v-model="category.elements"
                    :group="Skill.draggableCategory"
                >
                    <template #item="{element: skill}: {element: Skill}">
                        <div class="flex gap-3 p-0.5 text-nowrap items-center skill-row">
                            <rating-bar :value="skill.level" :max="skills.maxLevel"/>

                            <input-text v-model="skill.name" class="font-light skill-text" placeholder="Skill name"/>

                            <div v-if="editable" class="ms-auto flex gap-1 opacity-0 transition-opacity skill-row-edit-controls">
                                <button @click="decreaseSkillLevel(skill)" class="bg-transparent hover:bg-error/20 text-error py-0.5 px-1.5 rounded transition-all">
                                    <icon-decrease class="size-4"/>
                                </button>
                                <button @click="increaseSkillLevel(skill)" class="bg-transparent hover:bg-success/20 text-success py-0.5 px-1.5 rounded transition-all">
                                    <icon-increase class="size-4"/>
                                </button>
                            </div>
                        </div>
                    </template>

                    <template #empty>
                        <div class="list-placeholder h-12">Drag skills here</div>
                    </template>
                </draggable-list>
            </div>
        </template>
    </resume-section>
</template>

<!--suppress CssUnusedSymbol -->
<style lang="postcss" scoped>
    .skill-row:hover .skill-row-edit-controls {
        @apply opacity-100;
    }

    .skill-row:has(.skill-text:focus-within) .skill-row-edit-controls {
        @apply opacity-0;
    }
</style>