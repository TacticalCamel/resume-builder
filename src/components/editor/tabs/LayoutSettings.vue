<script setup lang="ts">
    import { Component as ComponentType } from "vue";
    import draggable from "vuedraggable";
    import { sectionComponents } from "@/models/SectionMap";
    import { contacts } from "@/models/ContactMap";
    import { createDefaultDarkTheme, createDefaultLightTheme } from "@/services/ThemeService";
    import BuildingBlock from "@/models/BuildingBlock";
    import Experience from "@/models/elements/Experience";
    import Education from "@/models/elements/Education";
    import SkillCategory from "@/models/elements/SkillCategory";
    import Skill from "@/models/elements/Skill";
    import Language from "@/models/elements/Language";
    import Project from "@/models/elements/Project";
    import Theme from "@/models/Theme";
    import DeleteArea from "@/components/editor/DeleteArea.vue";
    import IconLink from "@/components/icons/IconLink.vue";
    import IconSegment from "@/components/icons/IconSegment.vue";
    import IconCube from "@/components/icons/IconCube.vue";
    import IconSettings from "@/components/icons/IconSettings.vue";
    import EditorTab from "@/components/editor/tabs/EditorTab.vue";
    import EditorTabItem from "@/components/editor/tabs/EditorTabItem.vue";
    import IconDelete from "@/components/icons/IconDelete.vue";

    interface BlockGroup {
        [key: string]: {
            blocks: BuildingBlock[]
            icon: ComponentType
        };
    }

    const groups: BlockGroup = {
        sections: {
            blocks: Object.keys(sectionComponents).map(section => ({
                name: section,
                group: 'section',
                clone: (): string => section,
            })),
            icon: IconSegment
        },
        contacts: {
            blocks: Object.keys(contacts).map(contact => ({
                name: `${contact} contact`,
                group: 'contact',
                clone: (): string => contact,
            })),
            icon: IconLink
        },
        items: {
            blocks: [
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
                }
            ],
            icon: IconCube
        },
        config: {
            blocks: [
                {
                    name: 'font',
                    group: 'font',
                    clone: (): string => {
                        return 'undefined';
                    }
                },
                {
                    name: 'light theme',
                    group: 'theme',
                    clone: (): Theme => {
                        const theme: Theme = createDefaultLightTheme();

                        theme.id = crypto.randomUUID();
                        theme.name = 'New light theme';

                        return theme;
                    }
                },
                {
                    name: 'dark theme',
                    group: 'theme',
                    clone: (): Theme => {
                        const theme: Theme = createDefaultDarkTheme();

                        theme.id = crypto.randomUUID();
                        theme.name = 'New dark theme';

                        return theme;
                    }
                }
            ],
            icon: IconSettings
        }
    };
</script>

<template>
    <editor-tab>
        <editor-tab-item
            v-for="(_, key) in groups"
            :title="key.toString()"
            :icon="groups[key].icon"
        >
            <transition-group>
                <draggable
                    v-model="groups[key].blocks"
                    item-key="id"
                    key="draggable"
                    class="block-group grid grid-cols-3 gap-3 text-sm"
                    drag-class="dragging"
                    ghost-class="invisible"
                    animation="200"
                    :sort="false"
                    :group="{pull: 'clone', put: false}"
                    :clone="(block: BuildingBlock) => block.clone()"
                >
                    <template #item="{element: block}: {element: BuildingBlock}">
                        <div :data-group="block.group">
                            <div class="building-block">
                                <div class="first-letter:uppercase text-center">{{ block.name }}</div>
                            </div>
                        </div>
                    </template>
                </draggable>
            </transition-group>
        </editor-tab-item>

        <editor-tab-item title="delete items" :icon="IconDelete">
            <delete-area/>
        </editor-tab-item>
    </editor-tab>
</template>

<!--suppress CssUnusedSymbol -->
<style lang="postcss" scoped>
    .building-block {
        @apply flex items-center justify-center;
        @apply h-12 px-2 rounded border border-foreground/30;
        @apply outline outline-2 outline-transparent -outline-offset-1 cursor-move;

        transition: outline-color 150ms ease-in-out;
    }

    .building-block:hover {
        @apply outline-foreground;
    }
</style>