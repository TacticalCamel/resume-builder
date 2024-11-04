<script setup lang="ts">
    import { Component as ComponentType } from "vue";

    defineProps<{
        title?: string
        icon?: ComponentType
    }>();
</script>

<template>
    <div>
        <div v-if="title || icon" class="flex items-center gap-1 mb-2">
            <component v-if="icon" :is="icon" class="size-5"/>
            <span v-if="title" class="first-letter:uppercase font-medium">{{ title }}</span>
        </div>
        <div class="text-sm">
            <slot/>
        </div>
    </div>
</template>