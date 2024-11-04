<script setup lang="ts">
    const {value, max, style = 'card'} = defineProps<{
        value: number
        max: number
        style?: 'card' | 'bar'
    }>();

    function getColor(i: number) {
        if (i > value || 0 > i) {
            return 0;
        }

        if (i > max) {
            return max;
        }

        return value;
    }
</script>

<template>
    <div :class="style">
        <div v-for="i in max" :style="{backgroundColor: `rgb(var(--rating-bar-${getColor(i)}))`}"/>
    </div>
</template>

<!--suppress CssUnusedSymbol -->
<style lang="postcss" scoped>
    .card {
        @apply flex gap-[3px] px-[3px] py-px rounded-sm select-none shadow-sm shadow-black bg-background;

        * {
            @apply w-0.5 h-3.5 rounded-full;
        }
    }

    .bar {
        @apply flex items-stretch rounded-sm select-none shadow-sm shadow-black bg-background overflow-clip;

        * {
            @apply w-1.5 h-1.5;
        }
    }
</style>