<script setup lang="ts">
    import {provide, ref} from "vue";
    import type SettingsModel from "@/models/SettingsModel";
    import type ResumeModel from "@/models/ResumeModel";
    import {getDefaultSettings} from "@/models/SettingsModel";
    import Settings from "@/components/settings/Settings.vue";
    import Resume from "@/components/Resume.vue";
    import LandingPage from "@/components/LandingPage.vue";

    const settings = ref<SettingsModel>(getDefaultSettings());

    const resume = ref<ResumeModel | null>(null);

    provide('settings', settings);
</script>

<template>
    <main class="h-screen w-screen overflow-x-hidden bg-background text-primary">
        <resume v-if="resume" v-model="resume" :class="{'monochrome': settings.monochrome}"/>
        <landing-page v-else v-model:settings="settings" v-model:resume="resume"/>

        <settings v-model:settings="settings" v-model:resume="resume"/>
    </main>
</template>

<style scoped>
    main::-webkit-scrollbar {
        width: 14px;
    }

    main::-webkit-scrollbar-thumb {
        background-color: rgb(var(--primary));
        border-radius: 9999px;
        border: 4px solid rgb(var(--background));
    }

    main::-webkit-scrollbar-track {
        background-color: rgb(var(--background));
    }

    .monochrome {
        filter: grayscale(100%);
        backdrop-filter: grayscale(100%);
    }
</style>