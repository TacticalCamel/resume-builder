<script setup lang="ts">
    import { Experience, ExperienceList } from "@/models/resume/Experiences";
    import InputText from "@/components/shared/form/InputText.vue";
    import ResumeSection from "@/components/editor/resume/generic/ResumeSection.vue";
    import TechnologyList from "@/components/editor/resume/reusable/TechnologyList.vue";

    const experiences = defineModel<ExperienceList>({
        required: true
    });
</script>

<template>
    <resume-section
        v-model="experiences"
        group="Experience"
        :gap-x="2"
        :gap-y="1"
        grid-columns="min-content min-content 1fr"
        :sub-grid-columns="3"
    >
        <template #item="{element: experience}: {element: Experience}">
            <div class="flex items-start text-nowrap">
                <input-text v-model="experience.start" placeholder="Start date"/>
                <span class="mx-2">-</span>
                <input-text v-model="experience.finish" placeholder="Finish date"/>
            </div>

            <div class="flex flex-col items-start text-nowrap min-w-48">
                <input-text v-model="experience.company" placeholder="Company name"/>
                <input-text v-model="experience.position" placeholder="Position" class="text-foreground/60"/>
                <technology-list v-model="experience.stack" class="mt-2"/>
            </div>

            <div class="text-justify">
                <input-text v-model="experience.description" placeholder="Description of your responsibilities and achievements"/>
            </div>
        </template>
    </resume-section>
</template>