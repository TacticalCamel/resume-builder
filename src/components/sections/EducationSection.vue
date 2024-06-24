<script setup lang="ts">
    import type {EducationSection} from "@/models/sections/Education";
    import {inject, type PropType} from "vue";
    import EditText from "@/components/shared/EditText.vue";
    import IconWarning from "@/components/icons/IconWarning.vue";
    import IconListAdd from "@/components/icons/IconAdd.vue";
    import IconDelete from "@/components/icons/IconDelete.vue";

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
        <div class="flex md:items-center flex-col md:flex-row">
            <div class="flex outline-transparent items-center me-4">
                <edit-text v-model="model.title" class="uppercase text-2xl"/>
                <button v-if="editable" @click="addEducation" class="ms-8 me-4 text-green-500 bg-opacity-20 bg-green-500 px-4 py-0.5 rounded hover:bg-opacity-0 add">
                    <icon-list-add class="size-5"/>
                </button>
            </div>
            <div v-if="editable" class="flex items-center text-amber-500 mt-4 md:mt-0">
                <icon-warning v-if="!model.educations.length" class="size-6 me-2"/>
                <span v-if="!model.educations.length">Empty section will not be displayed</span>
            </div>
        </div>

        <table class="m-2 me-0">
            <tbody>
                <tr v-for="(edu, index) in model.educations" :key="edu.school">
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

<style scoped>
    tr{
        outline: 0 solid transparent;
    }

    tr:has(.delete:hover){
        outline: 1px solid rgb(239, 68, 68);
        border-radius: 0.25em;
        background-color: rgba(239, 68, 68, 0.2);
        transition: color, background-color, outline-color 150ms;
    }

    div:has(> .add:hover){
        outline: 1px solid rgb(34, 197, 94);
        border-radius: 0.25em;
        background-color: rgba(34, 197, 94, 0.2);
        transition: color, background-color, outline-color 150ms;
        align-items: stretch;
    }
</style>