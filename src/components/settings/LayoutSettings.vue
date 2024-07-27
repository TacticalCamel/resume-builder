<script setup lang="ts">
    import draggable from "vuedraggable";
    import { sectionComponents } from "@/models/SectionMap";
    import { contacts } from "@/models/ContactMap";
    import { settings } from "@/main";
    import { createDefaultDarkTheme, createDefaultLightTheme } from "@/services/ThemeService";
    import BuildingBlock from "@/models/BuildingBlock";
    import Experience from "@/models/elements/Experience";
    import Education from "@/models/elements/Education";
    import SkillCategory from "@/models/elements/SkillCategory";
    import Skill from "@/models/elements/Skill";
    import Language from "@/models/elements/Language";
    import Project from "@/models/elements/Project";
    import Theme from "@/models/Theme";
    import DeleteArea from "@/components/settings/DeleteArea.vue";
    import IconLink from "@/components/icons/IconLink.vue";
    import IconSegment from "@/components/icons/IconSegment.vue";
    import IconCube from "@/components/icons/IconCube.vue";
    import IconSettings from "@/components/icons/IconSettings.vue";
    import IconDashboard from "@/components/icons/IconDashboard.vue";

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
            name: 'font',
            group: 'font',
            clone: (): string => {
                return 'undefined';
            },
            icon: IconSettings
        },
        {
            name: 'light theme',
            group: 'theme',
            clone: (): Theme => {
                const theme: Theme = createDefaultLightTheme();

                theme.id = crypto.randomUUID();
                theme.name = 'New light theme';

                return theme;
            },
            icon: IconSettings
        },
        {
            name: 'dark theme',
            group: 'theme',
            clone: (): Theme => {
                const theme: Theme = createDefaultDarkTheme();

                theme.id = crypto.randomUUID();
                theme.name = 'New dark theme';

                return theme;
            },
            icon: IconSettings
        },
    ];
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="flex gap-2 items-center">
            <icon-dashboard class="size-6"/>
            <span>Layout</span>
        </div>

        <transition-group>
            <draggable
                v-model="blocks"
                item-key="id"
                key="draggable"
                class="flex flex-wrap flex-row items-start justify-start gap-2 text-sm"
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
                            <span class="first-letter:uppercase">{{ block.name }}</span>
                        </div>
                    </div>
                </template>
            </draggable>
        </transition-group>

        <delete-area/>
    </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .ghost-invisible {
        opacity: 0;
    }

    .building-block {
        background: linear-gradient(-60deg, rgb(var(--primary) / 0.6), rgb(var(--info) / 0.6));
        transition: outline-color 150ms;
        outline: 2px solid transparent;
        display: flex;
        align-items: center;
        padding: 1px 0.375rem;
        border-radius: 0.25rem;
        gap: 0.125rem;
        font-weight: 600;
        cursor: move;
    }

    .editable .building-block:hover {
        outline-color: rgb(var(--foreground));
    }
</style>