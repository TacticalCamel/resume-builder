<script setup lang="ts">
    import HeaderSection from "./sections/HeaderSection.vue";
    import EducationSection from "@/components/sections/EducationSection.vue";
    import SkillSection from "./sections/SkillSection.vue";
    import LanguageSection from "./sections/LanguageSection.vue";
    import ProjectSection from "@/components/sections/ProjectSection.vue";
    import Settings from "@/components/shared/Settings.vue";

    import {ref} from "vue";
    import type PageModel from "@/models/PageModel";

    const model = ref<PageModel>({
        profilePicture: null,
        template: null,
        isDarkTheme: true,
    });
</script>

<template>
    <main class="h-screen w-screen overflow-x-hidden transition-colors" :class="model.isDarkTheme ? 'theme-dark' : 'theme-light'">
        <settings v-model="model"/>

        <div v-if="model.template">
            <header class="py-10 px-5 mobile:px-10">
                <header-section :model="model.template.personal" :profile-picture="model.profilePicture"/>
            </header>
            <div class="py-10 px-5 mobile:px-10">
                <div class="grid gap-12 max-w-[720px] mx-auto">
                    <education-section :model="model.template.education"/>
                    <skill-section :model="model.template.skills"/>
                    <language-section :model="model.template.languages"/>
                    <project-section :model="model.template.projects"/>
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