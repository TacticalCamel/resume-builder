<script setup lang="ts">
    defineProps<{
        font: string
    }>()
</script>

<template>
    <div class="flex items-center px-2 py-0.5 rounded border-2 border-foreground/30 hover:border-foreground text-foreground/70 hover:text-foreground transition-colors">
        <span :style="{fontFamily: font}">{{ font }}</span>
    </div>
</template>