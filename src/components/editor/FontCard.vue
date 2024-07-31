<script setup lang="ts">
    defineProps({
        font: {
            type: String,
            required: true
        },
        isDefault: {
            type: Boolean,
            default: false
        }
    });
</script>

<template>
    <div>
        <div class="flex items-center justify-between gap-2 rounded-e hover:bg-foreground hover:bg-opacity-20 transition-colors text-sm px-2 border-2 border-transparent border-s-primary">
            <span :style="{fontFamily: font}">{{ font }}</span>
            <span v-if="isDefault" class="font-mono font-bold">[DEFAULT]</span>
        </div>
    </div>
</template>