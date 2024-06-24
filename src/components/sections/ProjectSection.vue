<script setup lang="ts">
    import IconLink from "@/components/icons/IconLink.vue";
    import type {Project, ProjectSection} from "@/models/sections/Project";
    import SectionTitle from "@/components/shared/SectionTitle.vue";
    import {inject, type PropType} from "vue";
    import EditText from "@/components/shared/EditText.vue";
    import IconAdd from "@/components/icons/IconAdd.vue";
    import IconDelete from "@/components/icons/IconDelete.vue";

    const model = defineModel({
        type: Object as PropType<ProjectSection>,
        required: true
    });

    const editable = inject<boolean>('isEditMode', false);

    function addProject() {
        model.value.projects.push({
            url: '',
            technologies: [],
            description: ''
        });
    }

    function addTechnology(project: Project) {
        project.technologies.push('');
    }
</script>

<template>
    <div>
        <section-title v-model="model.title" :display-warning="!model.projects.length" @on-add="addProject"/>
        <div class="italic opacity-60 font-light mb-4 text-sm flex">
            <edit-text v-model="model.disclaimer" v-if="editable || model.disclaimer.length" />
        </div>
        <div class="my-2 grid gap-6">
            <div v-for="project in model.projects" :key="project.description" class="flex delete-glow">
                <div class="me-0.5">
                    <icon-link class="size-5 mt-0.5"/>
                </div>
                <div class="flex flex-col items-start">
                    <div class="flex items-center flex-wrap">
                        <a :href="editable ? undefined : project.url" target="_blank" class="hover:transition-colors flex items-center me-2 mb-0.5 underline" :class="editable ? undefined : 'url-hover'">
                            <edit-text v-model="project.url" class="text-nowrap"/>
                        </a>
                        <div class="grid grid-flow-col gap-2 auto-cols-min mb-0.5">
                            <span v-for="(technology, index) in project.technologies" class="px-1 technology-card rounded text-sm shadow-sm shadow-[#000000bb]">
                                <edit-text v-model="project.technologies[index]"/>
                            </span>
                            <button v-if="editable" @click="addTechnology(project)" class="px-1 rounded bg-green-500 bg-opacity-20 text-green-500 outline outline-transparent outline-1 hover:outline-green-500 transition-all">
                                <icon-add class="size-5"/>
                            </button>
                            <button v-if="editable" @click="addTechnology(project)" class="px-3 rounded bg-red-500 bg-opacity-20 text-red-500 hover:bg-opacity-0 delete">
                                <icon-delete class="size-5"/>
                            </button>
                        </div>
                    </div>
                    <edit-text class="font-light" v-model="project.description"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .technology-card{
        background-color: var(--accent-bg);
        color: var(--primary-light);
    }

    .url-hover:hover {
        color: var(--accent-text);
    }
</style>