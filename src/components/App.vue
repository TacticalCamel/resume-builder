<script setup lang="ts">
    import {provide, ref} from "vue";
    import type SettingsModel from "@/models/SettingsModel";
    import type ResumeModel from "@/models/ResumeModel";
    import {getDefaultSettings} from "@/models/SettingsModel";
    import Settings from "@/components/settings/Settings.vue";
    import Resume from "@/components/Resume.vue";
    import LandingPage from "@/components/LandingPage.vue";
    import Navigation from "@/components/Navigation.vue";

    const settings = ref<SettingsModel>(getDefaultSettings());

    const resume = ref<ResumeModel | null>(null);

    provide('settings', settings);
</script>

<template>
    <main class="relative min-h-full">
        <navigation v-model:settings="settings"/>

        <resume v-if="resume" v-model="resume" :class="{'monochrome': settings.monochrome}"/>
        <landing-page v-else v-model:settings="settings" v-model:resume="resume"/>

        <settings v-model:settings="settings" v-model:resume="resume"/>
    </main>
</template>