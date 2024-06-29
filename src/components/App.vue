<script setup lang="ts">
    import Settings from "@/components/Settings.vue";
    import Resume from "@/components/Resume.vue";
    import {provide, ref} from "vue";
    import StartPage from "@/components/StartPage.vue";
    import type SettingsModel from "@/models/SettingsModel";
    import type ResumeModel from "@/models/ResumeModel";

    const settings = ref<SettingsModel>({
        settingsOpen: false,
        editable: true,
        darkTheme: false,
        monochrome: false,
        colors: [],
    });

    const resume = ref<ResumeModel | null>(null);

    provide('settings', settings);
</script>

<template>
    <main class="h-screen w-screen overflow-x-hidden" :class="{'theme-dark': settings.darkTheme, 'theme-light': !settings.darkTheme}">
        <resume v-if="resume" v-model="resume" :class="{'monochrome': settings.monochrome}"/>
        <start-page v-else v-model:settings="settings" v-model:resume="resume"/>

        <settings v-model:settings="settings" v-model:resume="resume"/>
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

    .monochrome {
        filter: grayscale(100%);
        backdrop-filter: grayscale(100%);
    }
</style>