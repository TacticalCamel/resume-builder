<script setup lang="ts">
    import { fontService } from "@/main";

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
        <div class="font-card" :class="{'active': font === fontService.currentFont}">
            <span :style="{fontFamily: font}">{{ font }}</span>
            <span v-if="isDefault" class="font-mono font-bold">[DEFAULT]</span>
        </div>
    </div>
</template>


<style lang="postcss" scoped>
    .font-card {
        @apply relative flex items-center justify-between px-2 rounded border border-foreground/30 overflow-clip h-12;
        @apply outline outline-2 outline-transparent -outline-offset-1;

        transition-property: background-color, outline-color;
        transition-duration: 150ms;
        transition-timing-function: ease-in-out;
    }

    .font-card:hover {
        @apply bg-foreground/10;
    }

    .font-card.active {
        @apply outline-foreground;
    }

</style>