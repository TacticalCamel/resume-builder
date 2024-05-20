<script setup lang="ts">
    import HeaderSection from "./sections/HeaderSection.vue";
    import EducationSection from "@/components/sections/EducationSection.vue";
    import SkillSection from "./sections/SkillSection.vue";
    import LanguageSection from "./sections/LanguageSection.vue";
    import ProjectSection from "@/components/sections/ProjectSection.vue";
    import Settings from "@/components/shared/Settings.vue";

    import {ref} from "vue";
    import type Model from "@/models/Model";

    const isDarkTheme = ref<boolean>(true);
    const image = ref<string>('');
    const model = ref<Model | null>(null);
</script>

<template>
    <main class="h-screen w-screen overflow-x-hidden" :class="isDarkTheme ? 'theme-dark' : 'theme-light'">
        <settings v-model:is-dark-theme="isDarkTheme" v-model:image="image" v-model:data="model"/>

        <div v-if="model">
            <header class="py-10 px-5 mobile:px-10">
                <header-section :personal-information="model?.personal" :profile-picture="image"/>
            </header>
            <div class="py-10 px-5 mobile:px-10">
                <div class="grid gap-12 max-w-[720px] mx-auto">
                    <education-section :education="model.educations"/>
                    <skill-section :skills="model.skillCategories"/>
                    <language-section :languages="model.languages"/>
                    <project-section :projects="model.projects" :disclaimer="model.projectsDisclaimer"/>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="h-screen flex justify-center items-center flex-col text-3xl text-red-500">
                <div class="mb-6">No data found</div>
                <div class="mb-6">Press 't' to open settings</div>
            </div>
        </div>
    </main>
</template>

<style scoped>
    main {
        background-color: var(--primary-bg);
        color: var(--primary-text);
    }

    main::-webkit-scrollbar {
        width: 14px;
    }

    main::-webkit-scrollbar-thumb {
        background-color: var(--primary-text);
        border-radius: 9999px;
        border: 4px solid var(--primary-bg);
    }

    main::-webkit-scrollbar-track {
        background-color: var(--primary-bg);
    }
</style>