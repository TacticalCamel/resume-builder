<script setup lang="ts">
    import {inject, ref} from "vue";
    import draggable from "vuedraggable";
    import type BuildingBlock from "@/models/BuildingBlock";
    import type Experience from "@/models/elements/Experience";
    import type Education from "@/models/elements/Education";
    import type SkillCategory from "@/models/elements/SkillCategory";
    import type Skill from "@/models/elements/Skill";
    import type Language from "@/models/elements/Language";
    import type Project from "@/models/elements/Project";
    import type Theme from "@/models/themes/Theme";
    import type SettingsModel from "@/models/SettingsModel";
    import {components as sections} from "@/models/Section";
    import {components as contacts} from "@/models/Contact";
    import DeleteArea from "@/components/settings/DeleteArea.vue";

    const settings = inject<SettingsModel>('settings', {} as SettingsModel);

    const blocks = ref<BuildingBlock[]>([
        ...Object.keys(sections).map(section => ({
            name: `${section} section`,
            group: 'section',
            clone: (): string => section
        })),
        ...Object.keys(contacts).map(contact => ({
            name: `${contact} contact`,
            group: 'contact',
            clone: (): string => contact
        })),
        {
            name: 'education',
            group: 'education',
            clone: (): Education => {
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
            clone: (): Experience => {
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
            clone: (): SkillCategory => {
                return {
                    title: '',
                    elements: []
                }
            }
        },
        {
            name: 'skill',
            group: 'skill',
            clone: (): Skill => {
                return {
                    name: '',
                    level: 0
                }
            }
        },
        {
            name: 'language',
            group: 'language',
            clone: (): Language => {
                return {
                    name: '',
                    level: ''
                }
            }
        },
        {
            name: 'project',
            group: 'project',
            clone: (): Project => {
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
            clone: (): string => ''
        },
        {
            name: 'theme',
            group: 'theme',
            clone: (): Theme => {
                return {
                    name: `theme`,
                    colors: []
                }
            }
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
                class="w-80 rounded flex flex-wrap flex-row gap-2 px-2 items-start justify-start"
                drag-class="dragging"
                ghost-class="ghost-invisible"
                animation="200"
                :sort="false"
                :group="{pull: 'clone', put: false}"
                :clone="(block: BuildingBlock) => block.clone()"
                :disabled="!settings.editable"
                :class="{'editable': settings.editable}"
            >
                <template #item="{element: block}: {element: BuildingBlock}">
                    <span :data-group="block.group" class="px-2 first-letter:uppercase transition-colors border-2 border-background rounded-lg">{{ block.name }}</span>
                </template>
            </draggable>
        </transition-group>

        <delete-area class="mt-2"/>
    </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .ghost-invisible{
        opacity: 0;
    }

    span {
        background: linear-gradient(-60deg, rgb(var(--accent) / 0.6), rgb(var(--info) / 0.6));
    }

    .editable span:hover {
        border-color: rgb(var(--primary ));
    }
</style>