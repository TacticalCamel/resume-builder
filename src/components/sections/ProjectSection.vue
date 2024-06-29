<script setup lang="ts">
    import {inject, type PropType} from "vue";
    import type ProjectSection from "@/models/sections/ProjectSection";
    import type Project from "@/models/elements/Project";
    import type SettingsModel from "@/models/SettingsModel";
    import EditText from "@/components/shared/EditText.vue";
    import IconLink from "@/components/icons/IconLink.vue";
    import IconAdd from "@/components/icons/IconAdd.vue";
    import IconDelete from "@/components/icons/IconDelete.vue";
    import ResumeSection from "@/components/sections/ResumeSection.vue";
    import Draggable from "vuedraggable";

    const model = defineModel({
        type: Object as PropType<ProjectSection>,
        required: true
    });

    const settings = inject<SettingsModel>('settings', {} as SettingsModel);

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
            <div class="italic text-opacity-60 text-primary font-light mb-4 text-sm flex" v-if="model.elements.length && (model.disclaimer.length || settings.editable)">
                <edit-text v-model="model.disclaimer"/>
            </div>
        </template>
        <template #item="{element: project}: {element: Project}">
            <td class="flex delete-glow pb-6">
                <div class="me-0.5">
                    <icon-link class="size-5 mt-0.5"/>
                </div>
                <div class="flex flex-col items-start">
                    <div class="flex items-center flex-wrap top-row">
                        <a :href="settings.editable ? undefined : project.url" target="_blank" class="hover:transition-colors flex items-center me-2 mb-0.5 underline" :class="settings.editable ? undefined : 'url-hover'">
                            <edit-text v-model="project.url" class="text-nowrap"/>
                        </a>

                        <transition-group>
                            <draggable
                                v-model="project.technologies"
                                item-key="id"
                                key="draggable"
                                :disabled="!settings.editable"
                                drag-class="dragging"
                                ghost-class="ghost"
                                animation="200"
                                class="grid grid-flow-col gap-2 auto-cols-min mb-0.5"
                            >
                                <template #item="{index}: {index: number}">
                                    <div class="flex relative">
                                        <span class="px-1 technology-card rounded bg-accent text-sm shadow-sm shadow-[#000000bb] transition-all text-nowrap">
                                            <edit-text v-model="project.technologies[index]"/>
                                        </span>
                                        <button v-if="settings.editable" @click="deleteTechnology(project, index)" class="absolute -translate-y-full z-10 w-full rounded bg-red-500 bg-opacity-20 text-red-500 delete-technology hidden justify-center hover:bg-opacity-0">
                                            <icon-delete class="size-5"/>
                                        </button>
                                    </div>
                                </template>

                                <template #footer>
                                    <button v-if="settings.editable" @click="addTechnology(project)" class="px-1 rounded bg-green-500 bg-opacity-20 text-green-500 outline outline-transparent outline-1 hover:outline-green-500 transition-all add opacity-0">
                                        <icon-add class="size-5"/>
                                    </button>
                                </template>
                            </draggable>
                        </transition-group>
                    </div>
                    <edit-text class="font-light" v-model="project.description"/>
                </div>
            </td>
        </template>
    </resume-section>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .technology-card {
        color: rgb(var(--primary));
    }

    div:has(> .technology-card):hover .delete-technology {
        display: flex;
    }

    div:has(> .technology-card:focus-within) .delete-technology {
        display: none;
    }

    .url-hover:hover {
        color: rgb(var(--accent));
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
        color: rgb(var(--primary));
    }
</style>