<script setup lang="ts">
    import { PropType, reactive } from "vue";
    import Theme from '@/models/Theme';
    import Color from "@/models/Color";

    const props = defineProps({
        theme: {
            type: Object as PropType<Theme>,
            required: true
        },
        isDefault: {
            type: Boolean,
            default: false
        }
    });

    const cardStyle = reactive({
        '--card-primary': getThemeColor('--primary'),
        '--card-background': getThemeColor('--background'),
        '--card-accent': getThemeColor('--accent')
    });

    function getThemeColor(key: string): string {
        const color: Color | undefined = props.theme.colors.find(c => c.name === key);

        return `rgb(${color?.value ?? '0 0 0'})`;
    }
</script>

<template>
    <div>
        <div class="theme-card-text flex items-center justify-between gap-2 relative rounded border-2 px-2 text-sm py-px overflow-clip" :style="cardStyle">
            <label v-if="theme.name.length">{{ theme.name }}</label>
            <label v-else class="italic opacity-70">Unnamed</label>
            <label v-if="isDefault" class="font-mono font-bold">[DEFAULT]</label>

            <div class="theme-card-accent w-2/5 pointer-events-none"/>
        </div>
    </div>
</template>

<style scoped>
    :root {
        --card-primary: none;
        --card-background: none;
        --card-accent: none;
    }

    .theme-card-text {
        background-color: var(--card-background);
        color: var(--card-primary);
        transition: background-color 150ms ease-in-out;
    }

    .theme-card-text > label {
        z-index: 1;
    }

    .theme-card-text:hover {
        background: var(--card-accent);
    }

    .theme-card-accent {
        position: absolute;
        top: 0;
        right: -2px;
        height: 100%;
        background: linear-gradient(90deg, transparent, var(--card-accent) 80%);
    }
</style>