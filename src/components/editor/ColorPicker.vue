<script setup lang="ts">
    import { computed } from "vue";
    import Color from "@/models/Color";
    import IconCopy from "@/components/icons/IconCopy.vue";
    import IconClose from "@/components/icons/IconClose.vue";

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
    <span class="inline-flex" :style="{background: colorInfo.hexColor, color: colorInfo.contrastColor}">
         <input :id="color.name" type="color" :value="colorInfo.hexColor" @change="setColor" class="invisible w-0 absolute">
         <label :for="color.name" class="flex w-full">
             <span class="flex flex-col gap-0.5">
                 <span class="capitalize">{{ color.name.substring(2).replace(/\-/g, ' ') }}</span>
                 <span class="font-mono">{{ colorInfo.hexColor }}</span>
             </span>
             <span class="grow flex justify-end items-center gap-4">
                 <icon-copy class="size-6"/>
                 <icon-close class="size-6"/>
             </span>
         </label>
    </span>
</template>

<style lang="postcss" scoped>

</style>