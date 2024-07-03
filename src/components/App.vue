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

        <transition mode="out-in" appear>
            <resume v-if="resume" v-model="resume" :class="{'monochrome': settings.monochrome}"/>
            <landing-page v-else v-model:settings="settings" v-model:resume="resume"/>
        </transition>

        <settings v-model:settings="settings" v-model:resume="resume"/>
    </main>
</template>

<style scoped>
    .v-enter-active, .v-leave-active {
        transition: all 300ms ease-in-out;
    }

    .v-enter-from, .v-leave-to {
        transform: translateX(-1rem);
        opacity: 0;
    }
</style>