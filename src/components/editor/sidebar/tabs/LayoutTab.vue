<script setup lang="ts">
    import { Component } from "vue";
    import { useContactViews } from "@/composables/ContactViews";
    import { useSectionViews } from "@/composables/SectionViews";
    import { useDraggableGroups } from "@/composables/DraggableGroups";
    import draggable from "vuedraggable";
    import { Section } from "@/models/resume/Resume";
    import { Contact } from "@/models/resume/Header";
    import { Education } from "@/models/resume/Educations";
    import { Experience } from "@/models/resume/Experiences";
    import { Skill, SkillCategory } from "@/models/resume/Skills";
    import { Language } from "@/models/resume/Languages";
    import { Project } from "@/models/resume/Projects";
    import { Technology } from "@/models/resume/Technologies";
    import DeleteArea from "@/components/editor/sidebar/reusable/DeleteArea.vue";
    import IconLink from "@/components/shared/icons/IconLink.vue";
    import IconSegment from "@/components/shared/icons/IconSegment.vue";
    import EditorTab from "@/components/editor/sidebar/generic/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import IconCube from "@/components/shared/icons/IconCube.vue";

    const {getSectionViews} = useSectionViews();
    const {getContactViews} = useContactViews();
    const {educationGroup, skillGroup, skillCategoryGroup, sectionGroup, experienceGroup, technologyGroup, languageGroup, projectGroup, contactGroup} = useDraggableGroups();

    interface BuildingBlock {
        group: string
        name: string
        clone: () => any
    }

    interface BlockGroup {
        blocks: BuildingBlock[]
        icon: Component
    }

    const groups: Record<string, BlockGroup> = {
        sections: {
            blocks: getSectionViews().map(([type, view]) => ({
                name: view.name,
                group: sectionGroup,
                clone: (): Section => ({
                    type: type,
                    title: view.name,
                    elements: []
                }),
            })),
            icon: IconSegment
        },
        contacts: {
            blocks: getContactViews().map(([type, view]) => ({
                name: view.name,
                group: contactGroup,
                clone: (): Contact => ({
                    type: type,
                    value: ''
                }),
            })),
            icon: IconLink
        },
        items: {
            blocks: [
                {
                    name: 'Education',
                    group: educationGroup,
                    clone: (): Education => ({
                        school: '',
                        major: '',
                        start: '',
                        finish: ''
                    })
                },
                {
                    name: 'Experience',
                    group: experienceGroup,
                    clone: (): Experience => ({
                        company: '',
                        position: '',
                        start: '',
                        finish: '',
                        description: '',
                        stack: []
                    })
                },
                {
                    name: 'Skill',
                    group: skillGroup,
                    clone: (): Skill => ({
                        name: '',
                        level: 0
                    })
                },
                {
                    name: 'Skill category',
                    group: skillCategoryGroup,
                    clone: (): SkillCategory => ({
                        title: '',
                        elements: [],
                        maxLevel: 5
                    })
                },
                {
                    name: 'Language',
                    group: languageGroup,
                    clone: (): Language => ({
                        name: '',
                        level: ''
                    })
                },
                {
                    name: 'Project',
                    group: projectGroup,
                    clone: (): Project => ({
                        description: '',
                        url: '',
                        technologies: []
                    })
                },
                {
                    name: 'Technology',
                    group: technologyGroup,
                    clone: (): Technology => ({
                        name: ''
                    })
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
                            <div class="building-block flex items-center justify-center px-1 text-foreground/70 hover:text-foreground transition-colors cursor-move min-w-20">
                                {{ block.name }}
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

<style lang="postcss" scoped>
    /* Only apply styles if the element is inside the container, so these styles are not applied when dragged elsewhere */
    .block-group .building-block {
        @apply h-12 grid rounded border-2 border-foreground/30 hover:border-foreground font-light;
    }
</style>
