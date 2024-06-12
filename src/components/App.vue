<script setup lang="ts">
    import HeaderSection from "./sections/HeaderSection.vue";
    import EducationSection from "@/components/sections/EducationSection.vue";
    import SkillSection from "./sections/SkillSection.vue";
    import LanguageSection from "./sections/LanguageSection.vue";
    import ProjectSection from "@/components/sections/ProjectSection.vue";
    import Settings from "@/components/settings/Settings.vue";

    import type PageModel from "@/models/PageModel";
    import {ref, provide} from "vue";

    // define a model containing all the information on the page
    const model = ref<PageModel>({
        isDarkTheme: false,
        isEditMode: false,
        profilePicture: null,
        template: {
            personal: {
                name: "",
                profession: "",
                email: "",
                phone: "",
                github: "",
                location: "",
                description: ""
            },
            education: null,
            skills: null,
            languages: null,
            projects: null
        },
        colors: new Map<string, string>()
    });

    // provide the model to all child components
    provide('model', model);
</script>

<template>
    <main class="h-screen w-screen overflow-x-hidden transition-colors" :class="model.isDarkTheme ? 'theme-dark' : 'theme-light'">
        <settings v-model="model"/>

        <div v-if="model.template">
            <header class="py-10 px-5 mobile:px-10">
                <header-section v-model:model="model.template.personal" v-model:profile-picture="model.profilePicture"/>
            </header>
            <div class="py-10 px-5 mobile:px-10">
                <div class="grid gap-12 max-w-[720px] mx-auto">
                    <education-section v-if="model.template.education" :model="model.template.education"/>
                    <skill-section v-if="model.template.skills" :model="model.template.skills"/>
                    <language-section v-if="model.template.languages" :model="model.template.languages"/>
                    <project-section v-if="model.template.projects" :model="model.template.projects"/>
                </div>
            </div>
        </div>
        <div v-else class="h-screen flex justify-center items-center flex-col text-3xl text-red-500 font-mono">
            <div class="mb-6">No data found</div>
            <div>Press 'alt + t' to open settings</div>
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

    .edit-mode input {
        background-color: var(--primary-text);
    }
</style>