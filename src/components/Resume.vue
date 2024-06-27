<script setup lang="ts">
    import draggable from "vuedraggable";
    import HeaderSection from "@/components/sections/HeaderSection.vue";
    import EducationSection from "@/components/sections/EducationSection.vue";
    import ExperienceSection from "@/components/sections/ExperienceSection.vue";
    import SkillSection from "@/components/sections/SkillSection.vue";
    import LanguageSection from "@/components/sections/LanguageSection.vue";
    import ProjectSection from "@/components/sections/ProjectSection.vue";
    import type Template from "@/models/Template";
    import {inject, type PropType} from "vue";
    import type {SectionMap, SectionKey} from "@/models/sections/Section";

    const editable = inject<boolean>('isEditMode', false);

    // a map to find each component by name
    const components: SectionMap = {
        education: EducationSection,
        experience: ExperienceSection,
        skills: SkillSection,
        languages: LanguageSection,
        projects: ProjectSection
    };

    const template = defineModel({
        type: Object as PropType<Template>,
        required: true
    });
</script>

<template>
    <div class="py-10 px-3 mobile:px-5 md:px-10">
        <transition-group>
            <draggable
                v-model="template.sections"
                item-key="id"
                key="draggable"
                class="grid max-w-[960px] mx-auto"
                :disabled="!editable"
                drag-class="dragging"
                ghost-class="ghost"
                animation="200"
            >
                <template #header>
                    <header>
                        <header-section v-model="template.header"/>
                    </header>
                </template>
                <template #item="{element}">
                    <section>
                        <component :is="components[element as SectionKey]" v-model="template[element as SectionKey]" :id="`section-${element}`" class="max-w-[720px] mx-auto"/>
                    </section>
                </template>
            </draggable>
        </transition-group>
    </div>
</template>

<style scoped>
    section:not(:last-child){
        padding-bottom: 1.25rem;
        margin-bottom: 0.5rem;
    }

    section:not(:first-child){
        padding-top: 1.25rem;
    }

    header{
        padding-bottom: 4.5rem;
        margin-bottom: 0.5rem;
    }

    section{
        border-radius: 0.5rem;
    }
</style>