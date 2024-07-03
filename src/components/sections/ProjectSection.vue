<script setup lang="ts">
    import {inject} from "vue";
    import type ProjectSection from "@/models/sections/ProjectSection";
    import type Project from "@/models/elements/Project";
    import type SettingsModel from "@/models/SettingsModel";
    import EditText from "@/components/shared/EditText.vue";
    import IconLink from "@/components/icons/IconLink.vue";
    import ResumeSection from "@/components/shared/ResumeSection.vue";
    import TechnologyList from "@/components/shared/TechnologyList.vue";

    const settings = inject<SettingsModel>('settings', {} as SettingsModel);

    const model = defineModel<ProjectSection>({
        required: true
    });
</script>

<template>
    <resume-section v-model="model" group="project">
        <template #header>
            <div class="italic text-opacity-60 text-primary font-light mb-4 text-sm flex" v-if="model.elements.length && (model.disclaimer.length || settings.editable)">
                <edit-text v-model="model.disclaimer" placeholder="disclaimer"/>
            </div>
        </template>
        <template #item="{element: project}: {element: Project}">
            <td class="flex delete-glow pb-6">
                <div class="me-0.5">
                    <icon-link class="size-5 mt-0.5"/>
                </div>
                <div class="flex flex-col items-start">
                    <div class="flex items-center flex-wrap">
                        <a :href="settings.editable ? undefined : project.url" target="_blank" class="hover:transition-colors flex items-center me-2 mb-0.5 underline text-nowrap" :class="settings.editable ? undefined : 'hover:text-accent'">
                            <edit-text v-model="project.url" placeholder="project url"/>
                        </a>

                        <technology-list v-model="project.technologies"/>
                    </div>
                    <edit-text class="font-light" v-model="project.description" placeholder="description"/>
                </div>
            </td>
        </template>
    </resume-section>
</template>