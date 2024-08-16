<script setup lang="ts">
    import { computed } from "vue";
    import Color, { hasDarkContrastText } from "@/models/Color";
    import IconCopy from "@/components/icons/IconCopy.vue";
    import IconReset from "@/components/icons/IconReset.vue";
    import { themeService } from "@/main";

    const color = defineModel<Color>({
        required: true
    });

    const emits = defineEmits<{
        change: []
    }>();

    const colorInfo = computed(() => {
        return {
            hexColor: rgb2hex(color.value.value),
            darkText: hasDarkContrastText(color.value.value)
        };
    });

    function setColor(event: Event): void {
        const input = event.target as HTMLInputElement;

        color.value.value = hex2rgb(input.value);

        emits('change');
    }

    function copyColor(): void {
        navigator.clipboard.writeText(colorInfo.value.hexColor);
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
</script>

<template>
    <span class="color-picker" :class="{'dark-text': colorInfo.darkText}" :style="{background: colorInfo.hexColor}">
         <label class="flex w-full">
             <input type="color" :value="colorInfo.hexColor" @change="setColor" class="invisible w-0 absolute">

             <span class="flex flex-col gap-0.5">
                 <span class="capitalize">{{ color.name.substring(2).replace(/\-/g, ' ') }}</span>
                 <span class="font-mono">{{ colorInfo.hexColor }}</span>
             </span>

             <span class="grow flex justify-end items-center">
                 <button @click="copyColor">
                    <icon-copy class="size-5"/>
                 </button>

                 <button @click="themeService.resetColor(color)" :disabled="!themeService.isColorModified(color)">
                    <icon-reset class="size-5 -scale-100 rotate-180"/>
                 </button>
             </span>
         </label>
    </span>
</template>

<style lang="postcss" scoped>
    .color-picker {
        @apply text-white inline-flex;
    }

    .color-picker.dark-text {
        @apply text-black;
    }

    .color-picker button {
        @apply transition-all opacity-0 rounded-lg px-4 py-2;
    }

    .color-picker:hover button {
        @apply opacity-100;
    }

    .color-picker button:hover {
        @apply bg-white/20;
    }

    .color-picker.dark-text button:hover {
        @apply bg-black/20;
    }

    .color-picker:hover button:disabled {
        @apply bg-transparent opacity-50;
    }
</style>