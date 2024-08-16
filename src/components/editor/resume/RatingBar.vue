<script setup lang="ts">
    const props = defineProps<{
        value: number
        max: number
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
    <div class="flex gap-[3px] px-[3px] py-px rounded-sm select-none shadow-sm shadow-black bg-background">
        <div v-for="i in props.max" class="w-0.5 h-3.5 rounded-full" :style="{backgroundColor: `rgb(var(--rating-bar-${getColor(i)}))`}"/>
    </div>
</template>