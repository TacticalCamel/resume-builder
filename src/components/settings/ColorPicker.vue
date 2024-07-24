<script setup lang="ts">
    import { computed } from "vue";
    import Color from "@/models/Color";

    const color = defineModel<Color>({
        required: true
    });

    const emits = defineEmits<{
        change: []
    }>();

    const colorInfo = computed(() => {
        const rgbValues = color.value.value.split(' ');
        const r = parseInt(rgbValues[0]);
        const g = parseInt(rgbValues[1]);
        const b = parseInt(rgbValues[2]);

        const brightness = r * 0.299 + g * 0.587 + b * 0.114;

        return {
            hexColor: `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`,
            contrastColor: brightness > 150 ? 'black' : 'white'
        };
    });

    function setColor(event: Event): void {
        const input = event.target as HTMLInputElement;

        color.value.value = hex2rgb(input.value);

        emits('change');
    }

    function hex2rgb(hex: string): string {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);

        return `${r} ${g} ${b}`;
    }
</script>

<template>
    <span :style="{background: colorInfo.hexColor, color: colorInfo.contrastColor}">
         <input :id="color.name" type="color" :value="colorInfo.hexColor" @change="setColor" class="invisible w-0 absolute">
         <label :for="color.name" class="font-mono">{{ colorInfo.hexColor }}</label>
    </span>
</template>

<style scoped>
    span {
        display: inline-flex;
    }
</style>