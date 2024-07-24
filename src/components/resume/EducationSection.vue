<script setup lang="ts">
    import EducationSection from "@/models/sections/EducationSection";
    import Education from "@/models/elements/Education";
    import EditText from "@/components/shared/EditText.vue";
    import ResumeSection from "@/components/resume/ResumeSection.vue";

    const model = defineModel<EducationSection>({
        required: true
    });
</script>

<template>
    <resume-section
        v-model="model"
        group="education"
        :gap-x="2"
        :gap-y="1"
        :sub-grid-columns="2"
    >
        <template #item="{element: education}: {element: Education}">
            <div class="flex items-start text-nowrap">
                <edit-text v-model="education.start" placeholder="Start date"/>
                <span class="mx-2">-</span>
                <edit-text v-model="education.finish" placeholder="Finish date"/>
            </div>
            <div class="flex flex-col items-start font-light">
                <edit-text v-model="education.school" placeholder="School name"/>
                <edit-text v-model="education.major" placeholder="Major" class="text-primary text-opacity-60"/>
            </div>
        </template>
    </resume-section>
</template>