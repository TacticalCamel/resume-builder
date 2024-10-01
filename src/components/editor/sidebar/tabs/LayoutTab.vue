<script setup lang="ts">
    import { Section, SectionType } from "@/models/resume/Resume";
    import { Education } from "@/models/resume/Educations";
    import { Experience } from "@/models/resume/Experiences";
    import { Skill, SkillCategory } from "@/models/resume/Skills";
    import { Language } from "@/models/resume/Languages";
    import { Project } from "@/models/resume/Projects";
    import { Technology } from "@/models/resume/Technologies";
    import { Contact, ContactType } from "@/models/resume/Header";
    import { LayoutGroup } from "@/models/bindings/LayoutGroup";
    import { LayoutItem } from "@/models/bindings/LayoutItem";
    import EditorTab from "@/components/editor/sidebar/generic/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import BlockGroup from "@/components/editor/sidebar/items/BlockGroup.vue";
    import DeleteArea from "@/components/editor/sidebar/reusable/DeleteArea.vue";
    import IconLink from "@/components/shared/icons/IconLink.vue";
    import IconSegment from "@/components/shared/icons/IconSegment.vue";
    import IconCube from "@/components/shared/icons/IconCube.vue";

    function createContact(type: ContactType, name: string): LayoutItem {
        return {
            name: name,
            group: 'Contact',
            clone: (): Contact => ({
                type: type,
                value: ''
            })
        };
    }

    function createSection(type: SectionType, name: string): LayoutItem {
        return {
            name: name,
            group: 'Section',
            clone: (): Section => ({
                type: type,
                title: name,
                elements: []
            })
        };
    }

    const contacts: LayoutGroup = {
        icon: IconLink,
        title: 'Contacts',
        items: [
            createContact(ContactType.email, 'Email'),
            createContact(ContactType.phone, 'Phone'),
            createContact(ContactType.github, 'Github'),
            createContact(ContactType.location, 'Location'),
            createContact(ContactType.linkedin, 'LinkedIn'),
        ]
    };

    const sections: LayoutGroup = {
        icon: IconSegment,
        title: 'Sections',
        items: [
            createSection(SectionType.educations, 'Educations'),
            createSection(SectionType.experiences, 'Experiences'),
            createSection(SectionType.skills, 'Skills'),
            createSection(SectionType.languages, 'Languages'),
            createSection(SectionType.projects, 'Projects')
        ]
    };

    const items: LayoutGroup = {
        icon: IconCube,
        title: 'Items',
        items: [
            {
                name: 'Education',
                group: 'Education',
                clone: (): Education => ({
                    school: '',
                    major: '',
                    start: '',
                    finish: ''
                })
            },
            {
                name: 'Experience',
                group: 'Experience',
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
                group: 'Skill',
                clone: (): Skill => ({
                    name: '',
                    level: 0
                })
            },
            {
                name: 'Skill category',
                group: 'SkillCategory',
                clone: (): SkillCategory => ({
                    title: '',
                    elements: [],
                    maxLevel: 5
                })
            },
            {
                name: 'Language',
                group: 'Language',
                clone: (): Language => ({
                    name: '',
                    level: ''
                })
            },
            {
                name: 'Project',
                group: 'Project',
                clone: (): Project => ({
                    description: '',
                    url: '',
                    technologies: []
                })
            },
            {
                name: 'Technology',
                group: 'Technology',
                clone: (): Technology => ({
                    name: ''
                })
            }
        ]
    };

    const groups: LayoutGroup[] = [
        sections,
        contacts,
        items
    ]
</script>

<template>
    <editor-tab>
        <block-group
            v-for="group in groups"
            :icon="group.icon"
            :title="group.title"
            :items="group.items"
        />

        <editor-tab-item title="delete elements">
            <delete-area/>
        </editor-tab-item>
    </editor-tab>
</template>