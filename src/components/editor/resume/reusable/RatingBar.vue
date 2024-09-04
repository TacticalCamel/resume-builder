<script setup lang="ts">
    const props = defineProps<{
        value: number
        max: number
        style?: 'card' | 'bar'
    }>();

    function getColor(i: number) {
        if (i > props.value || 0 > i) {
            return 0;
        }

        if (i > props.max) {
            return props.max;
        }

        return props.value;
    }
</script>

<template>
    <div :class="`style-${style ?? 'card'}`">
        <div v-for="i in props.max" :style="{backgroundColor: `rgb(var(--rating-bar-${getColor(i)}))`}"/>
    </div>
</template>

<style lang="postcss" scoped>
    .style-card {
        @apply flex gap-[3px] px-[3px] py-px rounded-sm select-none shadow-sm shadow-black bg-background;

        * {
            @apply w-0.5 h-3.5 rounded-full;
        }
    }

    .style-bar {
        @apply flex items-stretch rounded-sm select-none shadow-sm shadow-black bg-background overflow-clip;

        * {
            @apply w-1.5 h-1.5;
        }
    }
</style>