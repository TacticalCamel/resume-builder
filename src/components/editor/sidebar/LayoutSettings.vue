<script setup lang="ts">
    import { Component as ComponentType } from "vue";
    import draggable from "vuedraggable";
    import { sectionComponents } from "@/models/SectionMap";
    import BuildingBlock from "@/models/BuildingBlock";
    import DeleteArea from "@/components/editor/sidebar/DeleteArea.vue";
    import IconLink from "@/components/icons/IconLink.vue";
    import IconSegment from "@/components/icons/IconSegment.vue";
    import IconCube from "@/components/icons/IconCube.vue";
    import EditorTab from "@/components/editor/sidebar/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/EditorTabItem.vue";
    import IconDelete from "@/components/icons/IconDelete.vue";
    import { Education } from "@/components/editor/resume/EducationSection.vue";
    import { Experience } from "@/components/editor/resume/ExperienceSection.vue";
    import { Skill, SkillCategory } from "@/components/editor/resume/SkillSection.vue";
    import { Language } from "@/components/editor/resume/LanguageSection.vue";
    import { Project } from "@/components/editor/resume/ProjectSection.vue";
    import { contacts } from "@/models/ContactMap";

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
                name: contact,
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
                    class="block-group grid grid-cols-3 gap-2 text-sm"
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
                                <div class="first-letter:uppercase text-center font-light">{{ block.name }}</div>
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
        @apply outline outline-2 outline-transparent -outline-offset-1 cursor-move text-foreground/70;

        transition-property: outline-color, color;
        transition-duration: 150ms;
        transition-timing-function: ease-in-out;
    }

    .building-block:hover {
        @apply outline-foreground text-foreground;
    }
</style>