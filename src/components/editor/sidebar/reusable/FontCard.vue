<script setup lang="ts">
    import IconClose from "@/components/shared/icons/IconClose.vue";

    const {font, allowDelete = false} = defineProps<{
        font: string
        allowDelete?: boolean
    }>();

    defineEmits<{
        delete: []
    }>();
</script>

<template>
    <div class="flex items-center ps-2 py-0.5 rounded border-2 border-foreground/30 hover:border-foreground text-foreground/70 hover:text-foreground transition-colors cursor-pointer">
        <span :style="{fontFamily: font}">{{ font }}</span>
        <button v-if="allowDelete" class="ms-auto px-2 opacity-0 transition-opacity" @click.prevent.stop="$emit('delete')">
            <icon-close class="size-5"/>
        </button>
    </div>
</template>

<style scoped lang="postcss">
    div:hover > button {
        @apply opacity-100;
    }

    div:has(button:hover) {
        @apply text-error;
    }
</style>