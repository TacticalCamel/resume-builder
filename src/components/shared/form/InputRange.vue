<script setup lang="ts">
    import { computed } from "vue";

    const model = defineModel<number>({
        required: true
    });

    const { min, max, step = 1, unit = undefined, disabled = false } = defineProps<{
        min: number
        max: number
        step?: number
        unit?: string
        disabled?: boolean
    }>();

    const progress = computed(() => {
        return ~~((model.value - min) / (max - min) * 100) + '%';
    });
</script>

<template>
    <div class="relative flex items-center w-full select-none h-[2em]">
        <!-- track -->
        <input
            type="range"
            :min="min"
            :max="max"
            :step="step"
            v-model.number="model"
            class="w-full outline-0 h-[0.25em] rounded-[1px] appearance-none bg-foreground/20 shadow shadow-black/20"
            :disabled="disabled"
        />

        <!-- thumb -->
        <div class="absolute size-[1.5em] top-1/2 z-10 pointer-events-none bg-background" :style="{left: progress, transform: `translate(-${progress}, -50%)`}">
            <div class="absolute text-nowrap font-semibold top-[0.25em] left-1/2 -translate-x-1/2 -translate-y-full text-[0.8em]">{{ model }}{{ unit }}</div>
            <div class="absolute inset-0 bg-primary rounded-full border-[0.25em] border-background"/>
        </div>

        <!-- progress bar -->
        <div
            class="h-[0.25em] absolute pointer-events-none top-1/2 -translate-y-1/2 left-0 rounded-[1px] bg-primary"
            :style="{width: progress}"
        />
    </div>
</template>

<style lang="postcss" scoped>
    input::-webkit-slider-thumb, input::-moz-range-thumb, input::-ms-thumb {
        @apply appearance-none relative h-[2em] w-[1.5em] cursor-pointer z-20;
    }
</style>