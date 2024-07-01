<script setup lang="ts">
    import type ExperienceSection from "@/models/sections/ExperienceSection";
    import type Experience from "@/models/elements/Experience";
    import EditText from "@/components/shared/EditText.vue";
    import ResumeSection from "@/components/shared/ResumeSection.vue";
    import TechnologyList from "@/components/shared/TechnologyList.vue";

    const model = defineModel<ExperienceSection>({
        required: true
    });
</script>

<template>
    <resume-section v-model="model" group="experience">
        <template #item="{element: experience}: {element: Experience}">
            <td class="pe-8 mobile:pe-16 align-text-top text-nowrap">
                <div class="flex">
                    <edit-text v-model="experience.start"/>
                    <span class="mx-2">-</span>
                    <edit-text v-model="experience.finish"/>
                </div>
            </td>
            <td class="pe-6 mobile:pe-12 align-text-top text-nowrap">
                <div class="flex flex-col items-start">
                    <edit-text v-model="experience.company"/>
                    <edit-text v-model="experience.position" class="text-primary text-opacity-60"/>
                    <technology-list v-model="experience.stack" class="mt-2"/>
                </div>
            </td>
            <td class="text-justify align-text-top">
                <edit-text v-model="experience.description"/>
            </td>
        </template>
    </resume-section>
</template>