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
                    <edit-text v-model="education.start" placeholder="Start date"/>
                    <span class="mx-2">-</span>
                    <edit-text v-model="education.finish" placeholder="Finish date"/>
                </div>
            </td>
            <td class="font-light pb-4">
                <div class="flex flex-col items-start">
                    <edit-text v-model="education.school" placeholder="School name"/>
                    <edit-text v-model="education.major" placeholder="Major" class="text-primary text-opacity-60"/>
                </div>
            </td>
        </template>
    </resume-section>
</template>