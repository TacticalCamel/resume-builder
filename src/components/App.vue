<script setup lang="ts">
    import HeaderSection from "./sections/HeaderSection.vue";
    import EducationSection from "@/components/sections/EducationSection.vue";
    import SkillSection from "./sections/SkillSection.vue";
    import LanguageSection from "./sections/LanguageSection.vue";
    import ProjectSection from "@/components/sections/ProjectSection.vue";
    import Settings from "@/components/settings/Settings.vue";

    import type PageModel from "@/models/PageModel";
    import {createExampleTemplate} from "@/models/Template";
    import {onMounted, provide, ref} from "vue";
    import ExperienceSection from "@/components/sections/ExperienceSection.vue";

    // define a model containing all the information on the page
    const model = ref<PageModel>({
        isSettingsOpen: false,
        isDarkTheme: false,
        colors: new Map<string, string>(),
        template: null,
    });

    const isEditMode = ref<boolean>(true);

    // create an example template
    function createExample() {
        model.value.template = createExampleTemplate();
    }

    // toggle settings
    function toggleSettings(){
        model.value.isSettingsOpen = !model.value.isSettingsOpen;
    }

    onMounted(() => {
        // toggle settings on 'Alt + C'
        window.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 'c') {
                toggleSettings();
            }
        });
    });

    provide('isEditMode', isEditMode);
</script>

<template>
    <main class="h-screen w-screen overflow-x-hidden transition-colors" :class="model.isDarkTheme ? 'theme-dark' : 'theme-light'">
        <settings v-model:model="model" v-model:is-edit-mode="isEditMode"/>

        <div v-if="model.template">
            <header class="py-10 px-3 mobile:px-5 md:px-10">
                <header-section v-model="model.template.personal"/>
            </header>
            <div class="py-10 px-3 mobile:px-5 md:px-10">
                <div class="grid gap-12 max-w-[720px] mx-auto">
                    <education-section v-model="model.template.education"/>
                    <experience-section v-model="model.template.experience"/>
                    <skill-section v-model="model.template.skills"/>
                    <language-section v-model="model.template.languages"/>
                    <project-section v-model="model.template.projects"/>
                </div>
            </div>
        </div>
        <div v-else class="h-screen text-2xl flex justify-center items-center font-mono">
            <div class="grid gap-6 text-center select-none">
                <button @click="createExample" class="rounded font-semibold text-green-500 hover:bg-green-500 hover:bg-opacity-20 text-nowrap px-4 py-1 border border-green-500 border-opacity-50 font-mono hover:transition-colors text-center">
                    Create an example template
                </button>
                <button @click="toggleSettings" class="rounded font-semibold text-amber-500 hover:bg-amber-500 hover:bg-opacity-20 text-nowrap px-4 py-1 border border-amber-500 border-opacity-50 font-mono hover:transition-colors text-center">
                    Press 'Alt + C' to toggle settings
                </button>
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