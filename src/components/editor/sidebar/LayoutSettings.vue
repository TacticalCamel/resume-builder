<script setup lang="ts">
    import { Component } from "vue";
    import draggable from "vuedraggable";
    import BuildingBlock from "@/models/BuildingBlock";
    import DeleteArea from "@/components/editor/sidebar/DeleteArea.vue";
    import IconLink from "@/components/icons/IconLink.vue";
    import IconSegment from "@/components/icons/IconSegment.vue";
    import IconCube from "@/components/icons/IconCube.vue";
    import EditorTab from "@/components/editor/sidebar/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/EditorTabItem.vue";
    import { Skill, SkillCategory, SkillList } from "@/models/resume/Skills";
    import { Contact, ContactView } from "@/models/resume/Header";
    import { Education, EducationList } from "@/models/resume/Educations";
    import { Experience, ExperienceList } from "@/models/resume/Experiences";
    import { Language, LanguageList } from "@/models/resume/Languages";
    import { Project, ProjectList } from "@/models/resume/Projects";

    interface BlockGroup {
        blocks: BuildingBlock[]
        icon: Component
    }

    const sections: Record<string, any> = {
        'educations': EducationList,
        'experiences': ExperienceList,
        'skills': SkillList,
        'languages': LanguageList,
        'projects': ProjectList
    };

    const groups: Record<string, BlockGroup> = {
        sections: {
            blocks: Object.entries(sections).map(([key, value]) => ({
                name: key,
                group: 'section',
                clone: (): string => new value(),
            })),
            icon: IconSegment
        },
        contacts: {
            blocks: Object.keys(ContactView.BINDINGS).map(type => ({
                name: type,
                group: 'contact',
                clone: (): Contact => {
                    return new Contact(type, '');
                },
            })),
            icon: IconLink
        },
        items: {
            blocks: [
                {
                    name: 'education',
                    group: 'education',
                    clone: () => new Education()
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
            v-for="(group, key) in groups"
            :title="key"
            :icon="group.icon"
        >
            <transition-group>
                <draggable
                    v-model="group.blocks"
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
                            <div class="flex items-center justify-center h-12 px-1 rounded border-2 border-foreground/30 hover:border-foreground text-foreground/70 hover:text-foreground transition-colors font-light cursor-move">
                                <span class="first-letter:uppercase">{{ block.name }}</span>
                            </div>
                        </div>
                    </template>
                </draggable>
            </transition-group>
        </editor-tab-item>

        <editor-tab-item title="delete elements">
            <delete-area/>
        </editor-tab-item>
    </editor-tab>
</template>