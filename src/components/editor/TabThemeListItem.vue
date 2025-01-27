<script setup lang="ts">
    import { computed } from "vue";
    import { defaultThemes, isDarkContrast } from "@/functions/ThemeUtils.ts";
    import { Theme } from "@/models/Theme";
    import { Color } from "@/models/Color";
    import InputText from "@/components/shared/InputText.vue";

    const {theme, active} = defineProps<{
        theme: Theme,
        active: boolean
    }>();

    const colors = computed(() => ({
        background: getColorInformation(theme.colors.background),
        foreground: getColorInformation(theme.colors.foreground),
        primary: getColorInformation(theme.colors.primary),
        secondary: getColorInformation(theme.colors.secondary)
    }));

    const isDefault = computed(() => defaultThemes.light.id === theme.id || defaultThemes.dark.id === theme.id);

    function getColorInformation(color: Color) {
        return {
            value: color ? `rgb(${color.r} ${color.g} ${color.b})` : 'black',
            darkText: color ? isDarkContrast(color) : false
        };
    }
</script>

<template>
    <div>
        <div class="theme-card" :class="{'active': active}">
            <div class="grow flex items-center justify-between gap-2 text-sm px-2 pb-2">
                <input-text v-if="active" v-model="theme.name" placeholder="Theme name"/>
                <span v-else-if="theme.name && theme.name.length">{{ theme.name }}</span>
                <span v-else class="italic opacity-70">Unnamed</span>

                <span v-if="isDefault" class="font-mono font-semibold italic text-foreground/70">DEFAULT</span>
            </div>

            <div class="theme-colors">
                <div v-for="(color, name) in colors" :style="{background: color.value}" class="grow text-center flex justify-center items-center">
                    <span class="text-xs font-semibold" :style="{color: color.darkText ? 'black' : 'white'}">{{ name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
    .theme-card {
        @apply relative flex flex-col rounded border border-foreground/30 overflow-clip h-12;
        @apply outline outline-2 outline-transparent -outline-offset-1 select-none;

        transition: outline-color 150ms ease-in-out;

        &.active {
            @apply outline-foreground;
        }
    }

    .theme-colors {
        @apply absolute bottom-0 left-0 right-0 grid grid-cols-4 border-t border-foreground/30 h-2;
        transition-property: all;
        transition-duration: 300ms;
        transition-timing-function: ease-in-out;

        span {
            @apply opacity-0 transition-opacity duration-300;
        }
    }

    .theme-card:hover .theme-colors {
        @apply h-[calc(100%+2px)];

        span {
            @apply opacity-100;
        }
    }
</style>