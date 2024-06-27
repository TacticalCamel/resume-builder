<script setup lang="ts">
    import {type PropType} from "vue";
    import type EducationSection from "@/models/sections/EducationSection";
    import EditText from "@/components/shared/EditText.vue";
    import ResumeSection from "@/components/sections/ResumeSection.vue";

    const model = defineModel({
        type: Object as PropType<EducationSection>,
        required: true
    });

    function addEducation() {
        model.value.elements.push({
            school: '',
            major: '',
            start: '',
            finish: ''
        });
    }
</script>

<template>
    <resume-section v-model="model" @on-add="addEducation">
        <template #item="{element}">
            <td class="pe-8 mobile:pe-16 align-text-top text-nowrap">
                <div class="flex">
                    <edit-text v-model="element.start"/>
                    <span class="mx-2">-</span>
                    <edit-text v-model="element.finish"/>
                </div>
            </td>
            <td class="font-light pb-4">
                <edit-text v-model="element.school"/>
                <edit-text v-model="element.major" class="opacity-60"/>
            </td>
        </template>
    </resume-section>
</template>