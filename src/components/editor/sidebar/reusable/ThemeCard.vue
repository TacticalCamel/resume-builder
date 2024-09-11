<script setup lang="ts">
    import { ref } from "vue";
    import { useThemeService } from "@/composables/ThemeService";
    import { Theme } from "@/models/style/Theme";
    import { Color } from "@/models/style/Color";
    import InputText from "@/components/shared/form/InputText.vue";

    const themeService = useThemeService();

    const {theme, isDefault = false, isActive = false} = defineProps<{
        theme: Theme,
        isDefault?: boolean,
        isActive?: boolean
    }>();

    const themeColors = ref({
        background: getColorInformation('--background'),
        foreground: getColorInformation('--foreground'),
        primary: getColorInformation('--primary'),
        secondary: getColorInformation('--secondary')
    });

    function getColorInformation(name: string) {
        const color: Color | undefined = theme.colors.find(c => c.name === name);

        return {
            value: color ? `rgb(${color.value})` : 'black',
            darkText: color ? themeService.isDarkContrast(color) : false
        };
    }
</script>

<template>
    <div>
        <div class="theme-card" :class="{'active': isActive}">
            <div class="grow flex items-center justify-between gap-2 text-sm px-2 pb-2">
                <input-text v-if="isActive" v-model="theme.name" placeholder="Theme name"/>
                <span v-else-if="theme.name.length">{{ theme.name }}</span>
                <span v-else class="italic opacity-70">Unnamed</span>

                <span v-if="isDefault" class="font-mono font-bold">[DEFAULT]</span>
            </div>

            <div class="theme-colors">
                <div v-for="(color, name) in themeColors" :style="{background: color.value}" class="grow text-center flex justify-center items-center">
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