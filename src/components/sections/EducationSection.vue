<script setup lang="ts">
    import type {EducationSection} from "@/models/sections/Education";
    import {inject, type PropType} from "vue";
    import EditText from "@/components/shared/EditText.vue";
    import IconDelete from "@/components/icons/IconDelete.vue";
    import SectionTitle from "@/components/shared/SectionTitle.vue";

    const editable = inject<boolean>('isEditMode', false);

    const model = defineModel({
        type: Object as PropType<EducationSection>,
        required: true
    });

    function addEducation() {
        model.value.educations.push({
            school: '...',
            major: '...',
            start: '2000',
            finish: '2000'
        });
    }

    function deleteEducation(index: number) {
        model.value.educations.splice(index, 1);
    }
</script>

<template>
    <div v-if="editable || model.educations.length">
        <section-title v-model="model.title" :display-warning="!model.educations.length" @on-add="addEducation"/>

        <table class="m-2 me-0">
            <tbody>
                <tr v-for="(edu, index) in model.educations" :key="edu.school" class="delete-glow">
                    <td class="pe-8 mobile:pe-16 align-text-top text-nowrap">
                        <div class="flex">
                            <edit-text v-model="edu.start"/>
                            <span class="mx-2">-</span>
                            <edit-text v-model="edu.finish"/>
                        </div>
                    </td>
                    <td class="font-light pb-4">
                        <edit-text v-model="edu.school"/>
                        <edit-text v-model="edu.major" class="opacity-60"/>
                    </td>
                    <td v-if="editable" class="p-0 ps-8 h-0">
                        <button @click="deleteEducation(index)" class="bg-opacity-20 bg-red-500 text-red-500 px-4 py-0.5 rounded delete hover:h-full hover:bg-opacity-0">
                            <icon-delete class="size-5"/>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>