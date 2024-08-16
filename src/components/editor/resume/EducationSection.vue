<script setup lang="ts">
    import InputText from "@/components/shared/InputText.vue";
    import ResumeSection, { SectionModel } from "@/components/editor/resume/ResumeSection.vue";

    export interface EducationList extends SectionModel<Education> {
        title: string
        elements: Education[]
    }

    export interface Education {
        school: string
        major: string
        start: string
        finish: string
    }

    const model = defineModel<EducationList>({
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
                <input-text v-model="education.start" placeholder="Start date"/>
                <span class="mx-2">-</span>
                <input-text v-model="education.finish" placeholder="Finish date"/>
            </div>
            <div class="flex flex-col items-start font-light">
                <input-text v-model="education.school" placeholder="School name"/>
                <input-text v-model="education.major" placeholder="Major" class="text-foreground text-opacity-60"/>
            </div>
        </template>
    </resume-section>
</template>