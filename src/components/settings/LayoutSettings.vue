<script setup lang="ts">
    import {inject} from "vue";
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
    import IconLink from "@/components/icons/IconLink.vue";
    import IconSegment from "@/components/icons/settings/IconSegment.vue";
    import IconCube from "@/components/icons/settings/IconCube.vue";
    import IconSettings from "@/components/icons/settings/IconSettings.vue";

    const settings = inject<SettingsModel>('settings', {} as SettingsModel);

    const blocks: BuildingBlock[] = [
        ...Object.keys(sections).map(section => ({
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
            clone: (): Theme => {
                return {
                    name: `theme`,
                    colors: []
                }
            },
            icon: IconSettings
        }
    ];
</script>

<template>
    <div class="flex flex-col gap-4 min-w-80">
        <div class="pb-1 border-b border-primary border-opacity-40 text-xl">Building blocks</div>

        <transition-group>
            <draggable
                v-model="blocks"
                item-key="id"
                key="draggable"
                class="w-80 rounded flex flex-wrap flex-row gap-2 px-2 items-start justify-start text-sm"
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
                        <div class="building-block border-2 border-background rounded-lg transition-colors">
                            <component :is="block.icon" class="size-4"/>
                            <span class="first-letter:uppercase font-semibold">{{ block.name }}</span>
                        </div>
                    </div>
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

    .building-block {
        background: linear-gradient(-60deg, rgb(var(--accent) / 0.6), rgb(var(--info) / 0.6));
        display: flex;
        align-items: center;
        padding: 1px 0.375rem;
        gap: 0.25rem;
    }

    .editable .building-block:hover {
        border-color: rgb(var(--primary ));
    }
</style>