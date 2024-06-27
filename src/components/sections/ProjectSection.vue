<script setup lang="ts">
    import IconLink from "@/components/icons/IconLink.vue";
    import {inject, type PropType} from "vue";
    import EditText from "@/components/shared/EditText.vue";
    import IconAdd from "@/components/icons/IconAdd.vue";
    import IconDelete from "@/components/icons/IconDelete.vue";
    import type ProjectSection from "@/models/sections/ProjectSection";
    import ResumeSection from "@/components/sections/ResumeSection.vue";
    import type Project from "@/models/elements/Project";

    const model = defineModel({
        type: Object as PropType<ProjectSection>,
        required: true
    });

    const editable = inject<boolean>('isEditMode', false);

    function addProject() {
        model.value.elements.push({
            url: '',
            technologies: [],
            description: ''
        });
    }

    function addTechnology(project: Project) {
        project.technologies.push('');
    }

    function deleteTechnology(project: Project, index: number) {
        project.technologies.splice(index, 1);
    }
</script>

<template>
    <resume-section v-model="model" @on-add="addProject">
        <template #header>
            <div class="italic opacity-60 font-light mb-4 text-sm flex" v-if="model.elements.length && (model.disclaimer.length || editable)">
                <edit-text v-model="model.disclaimer"/>
            </div>
        </template>
        <template #item="{element}: {element: Project}">
            <td class="flex delete-glow pb-6">
                <div class="me-0.5">
                    <icon-link class="size-5 mt-0.5"/>
                </div>
                <div class="flex flex-col items-start">
                    <div class="flex items-center flex-wrap top-row">
                        <a :href="editable ? undefined : element.url" target="_blank" class="hover:transition-colors flex items-center me-2 mb-0.5 underline" :class="editable ? undefined : 'url-hover'">
                            <edit-text v-model="element.url" class="text-nowrap"/>
                        </a>
                        <div class="grid grid-flow-col gap-2 auto-cols-min mb-0.5">
                            <div v-for="index in element.technologies.length" class="flex relative">
                                <span class="px-1 technology-card rounded text-sm shadow-sm shadow-[#000000bb] transition-all">
                                    <edit-text v-model="element.technologies[index - 1]"/>
                                </span>
                                <button v-if="editable" @click="deleteTechnology(element, index - 1)" class="absolute -translate-y-full z-10 w-full rounded bg-red-500 bg-opacity-20 text-red-500 delete-technology hidden justify-center hover:bg-opacity-0">
                                    <icon-delete class="size-5"/>
                                </button>
                            </div>
                            <button v-if="editable" @click="addTechnology(element)" class="px-1 rounded bg-green-500 bg-opacity-20 text-green-500 outline outline-transparent outline-1 hover:outline-green-500 transition-all add opacity-0">
                                <icon-add class="size-5"/>
                            </button>
                        </div>
                    </div>
                    <edit-text class="font-light" v-model="element.description"/>
                </div>
            </td>
        </template>
    </resume-section>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .technology-card {
        background-color: var(--accent-bg);
        color: var(--primary-light);
    }

    div:has(> .technology-card):hover .delete-technology {
        display: flex;
    }

    div:has(> .technology-card):focus-within .delete-technology {
        display: none;
    }

    .url-hover:hover {
        color: var(--accent-text);
    }

    tr .edit-controls {
        display: none;
    }

    .top-row:hover .add {
        opacity: 1;
    }

    tr:hover .edit-controls {
        display: table-cell;
    }

    tr:has(.editable:focus-within) .edit-controls {
        display: none;
    }

    .top-row:has(.editable:focus-within) .add {
        opacity: 0;
    }

    .delete-technology:hover:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 200%;
        pointer-events: none;
        background-color: rgba(239, 68, 68, 0.2);
        outline: 1px solid rgb(239, 68, 68);
        border-radius: 0.25em;
    }

    div:has(> .delete-technology:hover) > .technology-card {
        background-color: transparent;
        box-shadow: none;
        z-index: 20;
        color: var(--primary-text);
    }
</style>