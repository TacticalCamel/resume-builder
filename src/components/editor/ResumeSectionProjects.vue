<script setup lang="ts">
    import { useEditor } from "@/composables/useEditor";
    import { Project, ProjectList } from "@/models/resume/Projects";
    import ResumeSection from "@/components/editor/ResumeSection.vue";
    import ResumeSectionTechnologyList from "@/components/editor/ResumeSectionTechnologyList.vue";
    import InputText from "@/components/shared/InputText.vue";
    import IconLink from "@/components/shared/IconLink.vue";

    const projects = defineModel<ProjectList>({
        required: true
    });

    const {viewable, editable} = useEditor();
</script>

<template>
    <resume-section
        v-model="projects"
        group="project"
        grid-columns="1fr"
        :gap-y="1.5"
    >
        <template #header>
            <div class="italic text-foreground/70 font-light mb-4 text-sm flex" v-if="editable || (projects.disclaimer.length && projects.elements.length)">
                <input-text v-model="projects.disclaimer" placeholder="Disclaimer about the projects"/>
            </div>
        </template>

        <template #item="{element: project}: {element: Project}">
            <div>
                <div class="flex items-center flex-wrap">
                    <a class="flex items-center gap-1 mb-1 me-2" :class="{'hover:text-info hover:transition-colors': viewable}" :href="viewable ? project.url : undefined" target="_blank">
                        <icon-link class="size-5"/>
                        <input-text :class="{'underline': viewable}" v-model="project.url" placeholder="Project URL"/>
                    </a>

                    <resume-section-technology-list v-model="project.technologies" class="mb-1"/>
                </div>

                <div class="flex">
                    <input-text class="font-light text-foreground/70" v-model="project.description" placeholder="Short description of the project"/>
                </div>
            </div>
        </template>
    </resume-section>
</template>