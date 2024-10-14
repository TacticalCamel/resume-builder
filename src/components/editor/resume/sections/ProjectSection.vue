<script setup lang="ts">
    import { useEditable } from "@/composables/useEditable";
    import { Project, ProjectList } from "@/models/resume/Projects";
    import InputText from "@/components/shared/form/InputText.vue";
    import IconLink from "@/components/shared/icons/IconLink.vue";
    import ResumeSection from "@/components/editor/resume/generic/ResumeSection.vue";
    import TechnologyList from "@/components/editor/resume/reusable/TechnologyList.vue";

    const projects = defineModel<ProjectList>({
        required: true
    });

    const {editable} = useEditable();
</script>

<template>
    <resume-section
        v-model="projects"
        group="Project"
        grid-columns="1fr"
        :gap-y="1.5"
    >
        <template #header>
            <div class="italic text-foreground/60 font-light mb-4 text-sm flex" v-if="editable || (projects.disclaimer.length && projects.elements.length)">
                <input-text v-model="projects.disclaimer" placeholder="Disclaimer about the projects"/>
            </div>
        </template>

        <template #item="{element: project}: {element: Project}">
            <div>
                <div class="flex items-center flex-wrap">
                    <a class="flex items-center gap-1 mb-1 me-2" :class="{'hover:text-info hover:transition-colors': !editable}" :href="editable ? undefined : project.url" target="_blank">
                        <icon-link class="size-5"/>
                        <input-text :class="{'underline': !editable}" v-model="project.url" placeholder="Project URL"/>
                    </a>

                    <technology-list v-model="project.technologies" class="mb-1"/>
                </div>

                <div class="flex">
                    <input-text class="font-light text-foreground/60" v-model="project.description" placeholder="Short description of the project"/>
                </div>
            </div>
        </template>
    </resume-section>
</template>