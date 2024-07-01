<script setup lang="ts">
    import {ref} from "vue";
    import draggable from "vuedraggable";
    import type BuildingBlock from "@/models/BuildingBlock";
    import type Experience from "@/models/elements/Experience";
    import type Education from "@/models/elements/Education";
    import type SkillCategory from "@/models/elements/SkillCategory";
    import type Skill from "@/models/elements/Skill";
    import type Language from "@/models/elements/Language";
    import type Project from "@/models/elements/Project";
    import {components as sections} from "@/models/Section";
    import {components as contacts} from "@/models/Contact";
    import DeleteArea from "@/components/settings/DeleteArea.vue";

    const blocks = ref<BuildingBlock[]>([
        ...Object.keys(sections).map(section => ({
            name: `${section} section`,
            group: 'section',
            clone: (_: BuildingBlock): string => section
        })),
        ...Object.keys(contacts).map(contact => ({
            name: `${contact} contact`,
            group: 'contact',
            clone: (_: BuildingBlock): string => contact
        })),
        {
            name: 'education',
            group: 'education',
            clone: (_: BuildingBlock): Education => {
                return {
                    school: '',
                    major: '',
                    start: '',
                    finish: ''
                }
            }
        },
        {
            name: 'experience',
            group: 'experience',
            clone: (_: BuildingBlock): Experience => {
                return {
                    company: '',
                    position: '',
                    start: '',
                    finish: '',
                    description: '',
                    stack: []
                }
            }
        },
        {
            name: 'skill category',
            group: 'skill-category',
            clone: (_: BuildingBlock): SkillCategory => {
                return {
                    title: '',
                    elements: []
                }
            }
        },
        {
            name: 'skill',
            group: 'skill',
            clone: (_: BuildingBlock): Skill => {
                return {
                    name: '',
                    level: 0
                }
            }
        },
        {
            name: 'language',
            group: 'language',
            clone: (_: BuildingBlock): Language => {
                return {
                    name: '',
                    level: ''
                }
            }
        },
        {
            name: 'project',
            group: 'project',
            clone: (_: BuildingBlock): Project => {
                return {
                    description: '',
                    url: '',
                    technologies: []
                }
            }
        },
        {
            name: 'technology',
            group: 'technology',
            clone: (_: BuildingBlock): string => ''
        }
    ]);
</script>

<template>
    <div class="flex flex-col gap-4 min-w-80">
        <div class="pb-1 border-b border-primary border-opacity-40 text-xl">Building blocks</div>

        <transition-group>
            <draggable
                v-model="blocks"
                item-key="id"
                key="draggable"
                :group="{pull: 'clone', put: false}"
                :clone="(block: BuildingBlock) => block.clone(block)"
                :sort="false"
                class="border-2 border-dashed border-info w-80 rounded flex flex-wrap flex-row gap-2 p-1.5 items-start justify-start"
                drag-class="dragging"
                ghost-class="ghost"
                animation="200"
            >
                <template #item="{element: block}: {element: BuildingBlock}">
                    <div :data-group="block.group" class="px-2 rounded bg-opacity-20 bg-info border-2 border-transparent hover:border-info first-letter:uppercase transition-colors">{{ block.name }}</div>
                </template>
            </draggable>
        </transition-group>

        <delete-area/>
    </div>
</template>