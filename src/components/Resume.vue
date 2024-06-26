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
    import type {SectionMap, SectionKey} from "@/models/Section";

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
        <header-section v-model="template.personal"/>
    </div>
    <div class="py-10 px-3 mobile:px-5 md:px-10">
        <transition-group>
            <draggable
                v-model="template.sections"
                item-key="id"
                class="grid gap-12 max-w-[960px] mx-auto"
                :disabled="!editable"
                drag-class="dragging"
                ghost-class="ghost"
                animation="200"
            >
                <template #item="{element}">
                    <div>
                        <component :is="components[element as SectionKey]" v-model="template[element as SectionKey]" :id="`section-${element}`" class="max-w-[720px] mx-auto"/>
                    </div>
                </template>
            </draggable>
        </transition-group>
    </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .ghost {
        border: 2px dashed rgb(14, 165, 233);
        background-color: rgba(14, 165, 233, 0.05);
        border-radius: 0.5rem;
    }

    .ghost > * {
        visibility: hidden;
    }

    .dragging > * {
        transform: rotate(5deg);
    }
</style>