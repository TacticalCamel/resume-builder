<script setup lang="ts">
    import {inject, type PropType} from "vue";
    import type {ExperienceSection} from "@/models/Experience";
    import SectionTitle from "@/components/shared/SectionTitle.vue";
    import EditText from "@/components/shared/EditText.vue";
    import IconDelete from "@/components/icons/IconDelete.vue";

    const editable = inject<boolean>('isEditMode', false);

    const model = defineModel({
        type: Object as PropType<ExperienceSection>,
        required: true
    });

    function addExperience() {
        model.value.experiences.push({
            company: '',
            position: '',
            start: '2000',
            finish: '2000',
            description: '',
            stack: []
        });
    }

    function deleteExperience(index: number) {
        model.value.experiences.splice(index, 1);
    }
</script>

<template>
    <div v-if="editable || model.experiences.length">
        <section-title v-model="model.title" :display-warning="!model.experiences.length" @on-add="addExperience"/>
        <table class="m-2 me-0">
            <tbody>
                <tr v-for="(experience, index) in model.experiences" :key="experience.company" class="delete-glow">
                    <td class="pe-8 mobile:pe-16 align-text-top text-nowrap">
                        <div class="flex">
                            <edit-text v-model="experience.start"/>
                            <span class="mx-2">-</span>
                            <edit-text v-model="experience.finish"/>
                        </div>
                    </td>
                    <td class="font-light pb-4">
                        <edit-text v-model="experience.company"/>
                        <edit-text v-model="experience.position" class="opacity-60"/>
                    </td>
                    <td v-if="editable" class="p-0 ps-8 h-0 edit-controls">
                        <button @click="deleteExperience(index)" class="bg-opacity-20 bg-red-500 text-red-500 px-4 py-0.5 rounded delete hover:h-full hover:bg-opacity-0">
                            <icon-delete class="size-5"/>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
    tr .edit-controls {
        display: none;
    }

    tr:hover .edit-controls {
        display: table-cell;
    }

    tr:has(.editable:focus-within) .edit-controls {
        display: none;
    }
</style>