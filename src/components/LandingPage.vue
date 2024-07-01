<script setup lang="ts">
    import type ResumeModel from "@/models/ResumeModel";
    import {getExampleResume} from "@/models/ResumeModel";

    const resume = defineModel<ResumeModel | null>('resume', {
        required: true
    });

    function createExample() {
        resume.value = getExampleResume();
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
            <button @click="createExample" class="rounded font-semibold text-success hover:bg-success hover:bg-opacity-20 text-nowrap px-4 py-1 border border-success border-opacity-50 font-mono hover:transition-colors text-center">
                Create an example template
            </button>
        </div>

        <div v-for="() in 0" class="rect" :style="getRandomStyle()"/>
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
        to {
            top: 100%;
        }
    }
</style>