<script setup lang="ts">
    import { inject } from "vue";
    import { editableInjectionKey } from "@/main";
    import { Skill } from "@/models/resume/Skills";
    import IconDecrease from "@/components/shared/icons/IconDecrease.vue";
    import DraggableList from "@/components/editor/resume/generic/DraggableList.vue";
    import RatingBar from "@/components/editor/resume/reusable/RatingBar.vue";
    import IconIncrease from "@/components/shared/icons/IconIncrease.vue";
    import InputText from "@/components/shared/form/InputText.vue";


    const skills = defineModel<Skill[]>({
        required: true
    });

    const {maxLevel} = defineProps<{
        maxLevel: number
    }>();

    const editable = inject<boolean>(editableInjectionKey, false);

    function decreaseSkillLevel(skill: Skill) {
        skill.level = Math.min(maxLevel, Math.max(0, skill.level - 1));
    }

    function increaseSkillLevel(skill: Skill) {
        skill.level = Math.min(maxLevel, Math.max(0, skill.level + 1));
    }
</script>

<template>
    <draggable-list
        v-model="skills"
        :group="Skill.draggableCategory"
    >
        <template #item="{element: skill}: {element: Skill}">
            <div class="flex gap-3 p-0.5 text-nowrap items-center skill-row">
                <rating-bar :value="skill.level" :max="maxLevel"/>

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