<script setup lang="ts">
    import ProjectSection from "@/models/sections/ProjectSection";
    import Project from "@/models/elements/Project";
    import EditText from "@/components/shared/EditText.vue";
    import IconLink from "@/components/icons/IconLink.vue";
    import ResumeSection from "@/components/editor/sections/ResumeSection.vue";
    import TechnologyList from "@/components/editor/TechnologyList.vue";
    import {settings} from "@/main";

    const model = defineModel<ProjectSection>({
        required: true
    });
</script>

<template>
    <resume-section
        v-model="model"
        group="project"
        grid-columns="1fr"
        :gap-y="1.5"
    >
        <template #header>
            <div class="italic text-opacity-60 text-foreground font-light mb-4 text-sm flex" v-if="model.elements.length && (model.disclaimer.length || settings.editable)">
                <edit-text v-model="model.disclaimer" placeholder="Disclaimer about the projects"/>
            </div>
        </template>

        <template #item="{element: project}: {element: Project}">
            <div>
                <div class="flex items-center justify-start mb-1">
                    <icon-link class="size-5 me-1"/>
                    <a :href="settings.editable ? undefined : project.url" target="_blank" class="hover:transition-colors flex items-center underline text-nowrap me-2" :class="settings.editable ? undefined : 'hover:text-primary'">
                        <edit-text v-model="project.url" placeholder="Project URL"/>
                    </a>
                    <technology-list v-model="project.technologies"/>
                </div>

                <div class="flex">
                    <edit-text class="font-light" v-model="project.description" placeholder="Short description of the project"/>
                </div>
            </div>
        </template>
    </resume-section>
</template>