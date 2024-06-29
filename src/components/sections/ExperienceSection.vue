<script setup lang="ts">
    import {type PropType} from "vue";
    import type ExperienceSection from "@/models/sections/ExperienceSection";
    import type Experience from "@/models/elements/Experience";
    import EditText from "@/components/shared/EditText.vue";
    import ResumeSection from "@/components/sections/ResumeSection.vue";

    const model = defineModel({
        type: Object as PropType<ExperienceSection>,
        required: true
    });

    function addExperience() {
        model.value.elements.push({
            company: '',
            position: '',
            start: '',
            finish: '',
            description: '',
            stack: []
        });
    }
</script>

<template>
    <resume-section v-model="model" @on-add="addExperience">
        <template #item="{element: experience}: {element: Experience}">
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
        </template>
    </resume-section>
</template>