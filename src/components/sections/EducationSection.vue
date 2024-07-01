<script setup lang="ts">
    import type EducationSection from "@/models/sections/EducationSection";
    import type Education from "@/models/elements/Education";
    import EditText from "@/components/shared/EditText.vue";
    import ResumeSection from "@/components/shared/ResumeSection.vue";

    const model = defineModel<EducationSection>({
        required: true
    });
</script>

<template>
    <resume-section v-model="model" group="education">
        <template #item="{element: education}: {element: Education}">
            <td class="pe-8 mobile:pe-16 align-text-top text-nowrap">
                <div class="flex">
                    <edit-text v-model="education.start"/>
                    <span class="mx-2">-</span>
                    <edit-text v-model="education.finish"/>
                </div>
            </td>
            <td class="font-light pb-4">
                <edit-text v-model="education.school"/>
                <edit-text v-model="education.major" class="text-primary text-opacity-60"/>
            </td>
        </template>
    </resume-section>
</template>