<script setup lang="ts">
    import ExperienceSection from "@/models/sections/ExperienceSection";
    import Experience from "@/models/elements/Experience";
    import EditText from "@/components/shared/EditText.vue";
    import ResumeSection from "@/components/editor/sections/ResumeSection.vue";
    import TechnologyList from "@/components/editor/TechnologyList.vue";

    const model = defineModel<ExperienceSection>({
        required: true
    });
</script>

<template>
    <resume-section
        v-model="model"
        group="experience"
        :gap-x="2"
        :gap-y="1"
        grid-columns="min-content min-content 1fr"
        :sub-grid-columns="3"
    >
        <template #item="{element: experience}: {element: Experience}">
            <div class="flex items-start text-nowrap">
                <edit-text v-model="experience.start" placeholder="Start date"/>
                <span class="mx-2">-</span>
                <edit-text v-model="experience.finish" placeholder="Finish date"/>
            </div>
            <div class="flex flex-col items-start text-nowrap min-w-48">
                <edit-text v-model="experience.company" placeholder="Company name"/>
                <edit-text v-model="experience.position" placeholder="Position" class="text-foreground text-opacity-60"/>
                <technology-list v-model="experience.stack" class="mt-2"/>
            </div>
            <div class="text-justify">
                <edit-text v-model="experience.description" placeholder="Description of your responsibilities and achievements"/>
            </div>
        </template>
    </resume-section>
</template>