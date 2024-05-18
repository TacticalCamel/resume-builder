<script setup lang="ts">
    import HeaderSection from "./components/HeaderSection.vue";
    import EducationSection from "@/components/EducationSection.vue";
    import SkillSection from "./components/SkillSection.vue";
    import LanguageSection from "./components/LanguageSection.vue";
    import ProjectSection from "@/components/ProjectSection.vue";

    import {model} from "@/main";
    import {onMounted, ref} from "vue";

    const isDarkMode = ref(true);

    onMounted(() => {
        window.addEventListener('keydown', (event) => {
            if (event.key === 't') {
                isDarkMode.value = !isDarkMode.value;
            }
        });
    });
</script>

<template>
    <main class="h-screen w-screen overflow-x-hidden" :class="isDarkMode ? 'theme-dark' : 'theme-light'">
        <header class="py-10 px-5 mobile:px-10">
            <header-section :personal-information="model.personal"/>
        </header>
        <div class="py-10 px-5 mobile:px-10">
            <div class="grid gap-12 max-w-[720px] mx-auto">
                <education-section v-if="model.educations?.length > 0" :education="model.educations"/>
                <skill-section v-if="model.skillCategories?.length > 0" :skills="model.skillCategories"/>
                <language-section v-if="model.languages?.length > 0" :languages="model.languages"/>
                <project-section v-if="model.projects?.length > 0" :projects="model.projects" :disclaimer="model.projectsDisclaimer"/>
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