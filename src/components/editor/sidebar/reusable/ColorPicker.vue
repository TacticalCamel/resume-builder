<script setup lang="ts">
    import { computed } from "vue";
    import { isDarkContrast } from "@/functions/Themes";
    import { useNotifications } from "@/composables/useNotifications";
    import { Color } from "@/models/style/Color";
    import IconCopy from "@/components/shared/icons/IconCopy.vue";
    import IconRenew from "@/components/shared/icons/IconRenew.vue";

    const {displayNotification} = useNotifications();

    const color = defineModel<Color>({
        required: true
    });

    const {disabled = false, modified = false} = defineProps<{
        disabled?: boolean,
        modified?: boolean
    }>();

    const emits = defineEmits<{
        reset: []
    }>();

    const hexColor = computed(() => rgb2hex(color.value.value));

    const displayName = computed(() => {
        return color.value.name.substring(2).replace(/-/g, ' ');
    });

    function setColor(event: Event): void {
        const input = event.target as HTMLInputElement;

        color.value.value = hex2rgb(input.value);
    }

    function copyColor(event: Event): void {
        navigator.clipboard.writeText(hexColor.value);

        displayNotification('success', {
            message: `Copied color "${displayName.value}"`
        });

        (event.target as HTMLElement).blur();
    }

    function hex2rgb(hex: string): string {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);

        return `${r} ${g} ${b}`;
    }

    function rgb2hex(rgb: string): string {
        const rgbValues = rgb.split(' ');
        const r = parseInt(rgbValues[0]);
        const g = parseInt(rgbValues[1]);
        const b = parseInt(rgbValues[2]);

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
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
            <span class="first-letter:capitalize">{{ displayName }}</span>
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