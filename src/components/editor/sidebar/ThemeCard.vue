<script setup lang="ts">
    import { PropType, reactive } from "vue";
    import Theme from '@/models/Theme';
    import InputText from "@/components/shared/InputText.vue";
    import Color from "@/models/Color";

    const props = defineProps({
        theme: {
            type: Object as PropType<Theme>,
            required: true
        },
        isDefault: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: false
        }
    });

    const themeColors = reactive({
        background: getThemeColor('--background'),
        foreground: getThemeColor('--foreground'),
        primary: getThemeColor('--primary'),
        secondary: getThemeColor('--secondary')
    });

    function getThemeColor(key: string) {
        const color: Color | undefined = props.theme.colors.find(c => c.name === key);
        const rgb = color?.value ?? '0 0 0';

        return {
            value: `rgb(${rgb})`,
            darkText: color?.isDarkContrast
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
    }

    .theme-card.active {
        @apply outline-foreground;
    }

    .theme-colors {
        @apply absolute bottom-0 left-0 right-0 grid grid-cols-4 border-t border-foreground/30 h-2;
        transition-property: all;
        transition-duration: 300ms;
        transition-timing-function: ease-in-out;
    }

    .theme-card:hover .theme-colors {
        @apply h-[calc(100%+2px)];
    }

    .theme-card .theme-colors span {
        @apply opacity-0 transition-opacity duration-300;
    }

    .theme-card:hover .theme-colors span {
        @apply opacity-100;
    }
</style>