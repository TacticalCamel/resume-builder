<script setup lang="ts">
    import draggable from "vuedraggable";
    import BuildingBlock from "@/models/BuildingBlock";
    import Experience from "@/models/elements/Experience";
    import Education from "@/models/elements/Education";
    import SkillCategory from "@/models/elements/SkillCategory";
    import Skill from "@/models/elements/Skill";
    import Language from "@/models/elements/Language";
    import Project from "@/models/elements/Project";
    import { sectionComponents } from "@/data/SectionMap";
    import { contacts } from "@/data/ContactMap";
    import DeleteArea from "@/components/settings/DeleteArea.vue";
    import IconLink from "@/components/icons/IconLink.vue";
    import IconSegment from "@/components/icons/settings/IconSegment.vue";
    import IconCube from "@/components/icons/settings/IconCube.vue";
    import IconSettings from "@/components/icons/settings/IconSettings.vue";
    import ToggleSwitch from "@/components/shared/ToggleSwitch.vue";
    import { settings } from "@/main";

    const blocks: BuildingBlock[] = [
        ...Object.keys(sectionComponents).map(section => ({
            name: `${section} section`,
            group: 'section',
            clone: (): string => section,
            icon: IconSegment
        })),
        ...Object.keys(contacts).map(contact => ({
            name: `${contact} contact`,
            group: 'contact',
            clone: (): string => contact,
            icon: IconLink
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
            },
            icon: IconCube
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
            },
            icon: IconCube
        },
        {
            name: 'skill category',
            group: 'skill-category',
            clone: (): SkillCategory => {
                return {
                    title: '',
                    elements: []
                }
            },
            icon: IconCube
        },
        {
            name: 'skill',
            group: 'skill',
            clone: (): Skill => {
                return {
                    name: '',
                    level: 0
                }
            },
            icon: IconCube
        },
        {
            name: 'language',
            group: 'language',
            clone: (): Language => {
                return {
                    name: '',
                    level: ''
                }
            },
            icon: IconCube
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
            },
            icon: IconCube
        },
        {
            name: 'technology',
            group: 'technology',
            clone: (): string => '',
            icon: IconCube
        },
        {
            name: 'theme',
            group: 'theme',
            clone: (): object => {
                return {
                    id: crypto.randomUUID(),
                    name: 'New theme',
                    colors: []
                }
            },
            icon: IconSettings
        },
        {
            name: 'font',
            group: 'font',
            clone: (): object => {
                return {}
            },
            icon: IconSettings
        },
    ];
</script>

<template>
    <div class="flex flex-col gap-4 min-w-80">
        <div class="pb-0.5 px-2 me-1 border-b border-primary border-opacity-50 text-xl">Layout</div>

        <div class="flex px-2 justify-between">
            <div>Editable</div>
            <toggle-switch v-model="settings.editable"/>
        </div>

        <transition-group>
            <draggable
                v-model="blocks"
                item-key="id"
                key="draggable"
                class="flex flex-wrap items-start justify-start flex-row w-80 mx-2 gap-2 p-2 text-sm border-2 border-dashed border-info bg-opacity-10 bg-info rounded-lg"
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
                    <div :data-group="block.group">
                        <div class="building-block">
                            <component :is="block.icon" class="size-4"/>
                            <span class="first-letter:uppercase font-semibold">{{ block.name }}</span>
                        </div>
                    </div>
                </template>
            </draggable>
        </transition-group>

        <delete-area class="m-2 mb-0"/>
    </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .ghost-invisible {
        opacity: 0;
    }

    .building-block {
        background: linear-gradient(-60deg, rgb(var(--accent) / 0.6), rgb(var(--info) / 0.6));
        transition: outline-color 150ms;
        outline: 2px solid transparent;
        display: flex;
        align-items: center;
        padding: 1px 0.375rem;
        border-radius: 0.375rem;
        gap: 0.125rem;
    }

    .editable .building-block:hover {
        outline-color: rgb(var(--primary));
    }
</style>