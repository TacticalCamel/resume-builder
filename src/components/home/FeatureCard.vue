<script setup lang="ts">
    const {title} = defineProps<{
        title: string
    }>();
</script>

<template>
    <div class="p-0.5 w-96 px-4 py-2">
        <div class="font-semibold text-2xl text-secondary mb-2">{{ title }}</div>
        <div class="text-foreground text-[17px]">
            <slot/>
        </div>
    </div>
</template>