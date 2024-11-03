<script setup lang="ts">
    import { computed } from "vue";
    import { injectEditorModel } from "@/functions/Editor";
    import { EditorState } from "@/models/EditorState";
    import { Skill } from "@/models/resume/Skills";
    import IconDecrease from "@/components/shared/icons/IconDecrease.vue";
    import DraggableList from "@/components/editor/resume/generic/DraggableList.vue";
    import RatingBar from "@/components/editor/resume/reusable/RatingBar.vue";
    import IconIncrease from "@/components/shared/icons/IconIncrease.vue";
    import InputText from "@/components/shared/form/InputText.vue";
    import StylableElement from "@/components/editor/resume/generic/StylableElement.vue";

    const skills = defineModel<Skill[]>({
        required: true
    });

    const {maxLevel} = defineProps<{
        maxLevel: number
    }>();

    const {editorState} = injectEditorModel();

    const editable = computed(() => editorState.value === EditorState.edit);

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
        group="skill"
        class="grid gap-1"
    >
        <template #item="{element: skill}: {element: Skill}">
            <stylable-element class="flex gap-3 text-nowrap px-0.5 items-center skill-row" class-selector="skill" :id="skill.id">
                <rating-bar :value="skill.level" :max="maxLevel"/>

                <input-text v-model="skill.name" class="font-light skill-text" placeholder="Skill name"/>

                <div v-if="editable" class="ms-auto flex gap-1">
                    <button @click="decreaseSkillLevel(skill)" class="hover:bg-error/20 text-error">
                        <icon-decrease class="size-4"/>
                    </button>

                    <button @click="increaseSkillLevel(skill)" class="hover:bg-success/20 text-success">
                        <icon-increase class="size-4"/>
                    </button>
                </div>
            </stylable-element>
        </template>

        <template #empty>
            <span class="p-2">Drag skills here</span>
        </template>
    </draggable-list>
</template>

<!--suppress CssUnusedSymbol -->
<style lang="postcss" scoped>
    .skill-row {
        button {
            @apply opacity-0 transition-all px-2 py-1 rounded outline-0;
        }

        &:hover button, button:focus {
            @apply opacity-100;
        }

        &:has(.skill-text:focus-within) button {
            @apply opacity-0;
        }
    }
</style>