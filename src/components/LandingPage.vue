<script setup lang="ts">
    import type SettingsModel from "@/models/SettingsModel";
    import type ResumeModel from "@/models/ResumeModel";
    import {createExampleResume} from "@/models/ResumeModel";

    const settings = defineModel<SettingsModel>('settings', {
        required: true
    });

    const resume = defineModel<ResumeModel | null>('resume', {
        required: true
    });

    function createExample() {
        resume.value = createExampleResume();
    }

    // toggle settings
    function toggleSettings() {
        settings.value.settingsOpen = !settings.value.settingsOpen;
    }

    const minSize = 3;
    const maxSize = 8;
    const spreadX = 100 + maxSize;
    const spreadY = 100;
    const minDuration = 20;
    const maxDuration = 25;

    function getRandomStyle() {

        const top = -maxSize * 2.5 - spreadY * Math.random();
        const left = -maxSize / 2 + spreadX * Math.random();
        const size = minSize + (maxSize - minSize) * Math.random();
        const duration = minDuration + (maxDuration - minDuration) * Math.random();

        return {
            top: `${top}%`,
            left: `${left}%`,
            width: `${size}vh`,
            height: `${size}vh`,
            animationDuration: `${duration}s`
        };
    }
</script>

<template>
    <div class="h-screen text-2xl flex justify-center items-center font-mono relative overflow-clip">
        <div class="grid gap-6 text-center select-none">
            <button @click="createExample" class="rounded font-semibold text-green-500 hover:bg-green-500 hover:bg-opacity-20 text-nowrap px-4 py-1 border border-green-500 border-opacity-50 font-mono hover:transition-colors text-center">
                Create an example template
            </button>
            <button @click="toggleSettings" class="rounded font-semibold text-amber-500 hover:bg-amber-500 hover:bg-opacity-20 text-nowrap px-4 py-1 border border-amber-500 border-opacity-50 font-mono hover:transition-colors text-center">
                Press 'Alt + C' to toggle settings
            </button>
        </div>

        <div v-for="i in 0" class="rect" :style="getRandomStyle()"/>
    </div>
</template>

<style scoped>
    .rect {
        position: absolute;
        border: 0.5rem solid #7249e4;
        border-radius: 10%;
        animation-name: flow;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    @keyframes flow {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(120vh);
        }
    }
</style>