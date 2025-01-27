<script setup lang="ts">
    import { computed } from "vue";
    import { isDarkContrast } from "@/functions/ThemeUtilities";
    import { useNotifications } from "@/composables/useNotifications";
    import { Color } from "@/models/Color";
    import IconCopy from "@/components/shared/IconCopy.vue";
    import IconRenew from "@/components/shared/IconRenew.vue";

    const {createNotification} = useNotifications();

    const color = defineModel<Color>({
        required: true
    });

    const {disabled = false, modified = false, name} = defineProps<{
        disabled?: boolean,
        modified?: boolean,
        name?: string
    }>();

    const emits = defineEmits<{
        reset: []
    }>();

    const hexColor = computed(() => rgb2hex(color.value));

    function setColor(event: Event): void {
        const input = event.target as HTMLInputElement;

        color.value = hex2rgb(input.value);
    }

    function copyColor(event: Event): void {
        navigator.clipboard.writeText(hexColor.value);

        createNotification('success', {
            message: `Copied color "${name}"`
        });

        (event.target as HTMLElement).blur();
    }

    function hex2rgb(hex: string): Color {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);

        return {r, g, b};
    }

    function rgb2hex(value: Color): string {
        return `#${value.r.toString(16).padStart(2, '0')}${value.g.toString(16).padStart(2, '0')}${value.b.toString(16).padStart(2, '0')}`;
    }

    function reset() {
        emits('reset');
    }
</script>

<template>
    <label class="color-picker inline-flex justify-between w-full" :class="{'dark-text': isDarkContrast(color)}" :style="{background: hexColor}">
        <input
            type="color"
            class="invisible w-0 absolute"
            :value="hexColor"
            :disabled="disabled"
            @change="setColor"
        >

        <span class="flex flex-col gap-0.5">
            <span class="capitalize">{{ name }}</span>
            <span class="inline-flex items-center gap-1">
                <button class="peer font-mono opacity-60 hover:opacity-100 focus:opacity-100 focus:outline-0 transition-opacity" @click.prevent.stop="copyColor">{{ hexColor }}</button>
                <icon-copy class="size-4 opacity-60 peer-hover:opacity-100 peer-focus:opacity-100 transition-opacity pointer-events-none"/>
            </span>
        </span>

        <button v-if="modified" @click.prevent.stop="reset()" class="transition-all px-2">
            <icon-renew class="size-5 -scale-100 rotate-180"/>
        </button>
    </label>
</template>

<style lang="postcss" scoped>
    .color-picker {
        @apply text-white;

        > button:hover, > button:focus {
            filter: drop-shadow(1px 1px 3px white);
            outline: none;
        }

        &:has(input:disabled) {
            @apply cursor-not-allowed;
        }
    }

    .color-picker.dark-text {
        @apply text-black;

        > button:hover, > button:focus {
            filter: drop-shadow(1px 1px 3px black);
        }
    }
</style>