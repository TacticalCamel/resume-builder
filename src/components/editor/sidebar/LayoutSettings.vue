<script setup lang="ts">
    import { Component } from "vue";
    import draggable from "vuedraggable";
    import DeleteArea from "@/components/editor/sidebar/DeleteArea.vue";
    import IconLink from "@/components/icons/IconLink.vue";
    import IconSegment from "@/components/icons/IconSegment.vue";
    import IconCube from "@/components/icons/IconCube.vue";
    import EditorTab from "@/components/editor/sidebar/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/EditorTabItem.vue";
    import { Contact, ContactView } from "@/models/resume/Header";
    import { Skill, SkillCategory, SkillList } from "@/models/resume/Skills";
    import { Education, EducationList } from "@/models/resume/Educations";
    import { Experience, ExperienceList } from "@/models/resume/Experiences";
    import { Language, LanguageList } from "@/models/resume/Languages";
    import { Project, ProjectList } from "@/models/resume/Projects";
    import { Technology } from "@/models/resume/Technologies";

    interface BuildingBlock {
        group: string
        name: string
        clone: () => any
    }

    interface BlockGroup {
        blocks: BuildingBlock[]
        icon: Component
    }

    const sections: Record<string, any> = {
        'Educations': EducationList,
        'Experiences': ExperienceList,
        'Skills': SkillList,
        'Languages': LanguageList,
        'Projects': ProjectList
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
                name: type[0].toUpperCase() + type.slice(1),
                group: Contact.draggableCategory,
                clone: (): Contact => {
                    return new Contact(type, '');
                },
            })),
            icon: IconLink
        },
        items: {
            blocks: [
                {
                    name: 'Education',
                    group: Education.draggableCategory,
                    clone: () => new Education()
                },
                {
                    name: 'Experience',
                    group: Experience.draggableCategory,
                    clone: () => new Experience()
                },
                {
                    name: 'Skill',
                    group: Skill.draggableCategory,
                    clone: () => new Skill()
                },
                {
                    name: 'Skill category',
                    group: SkillCategory.draggableCategory,
                    clone: () => new SkillCategory()
                },
                {
                    name: 'Language',
                    group: Language.draggableCategory,
                    clone: () => new Language()
                },
                {
                    name: 'Project',
                    group: Project.draggableCategory,
                    clone: () => new Project()
                },
                {
                    name: 'Technology',
                    group: Technology.draggableCategory,
                    clone: () => new Technology()
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
