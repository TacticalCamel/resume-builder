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
        '--card-foreground': getThemeColor('--foreground'),
        '--card-background': getThemeColor('--background'),
        '--card-primary': getThemeColor('--primary')
    });

    function getThemeColor(key: string): string {
        const color: Color | undefined = props.theme.colors.find(c => c.name === key);

        return `rgb(${color?.value ?? '0 0 0'})`;
    }
</script>

<template>
    <div>
        <div class="theme-card-text flex items-center justify-between gap-2 relative rounded px-2 text-sm py-px overflow-clip h-10" :style="cardStyle">
            <label v-if="theme.name.length">{{ theme.name }}</label>
            <label v-else class="italic opacity-70">Unnamed</label>
            <label v-if="isDefault" class="font-mono font-bold">[DEFAULT]</label>

            <div class="theme-card-primary w-2/5 pointer-events-none"/>
        </div>
    </div>
</template>

<style scoped>
    :root {
        --card-foreground: none;
        --card-background: none;
        --card-primary: none;
    }

    .theme-card-text {
        background-color: var(--card-background);
        color: var(--card-foreground);
        border: rgb(var(--foreground) / 0.3) solid 1px;
        outline: transparent solid 2px;
        outline-offset: -1px;
        transition-property: background-color, outline-color;
        transition-duration: 150ms;
        transition-timing-function: ease-in-out;
    }

    .theme-card-text > label {
        z-index: 1;
    }

    .theme-card-text:hover {
        background: var(--card-primary);
        outline-color: rgb(var(--foreground));
    }

    .theme-card-primary {
        position: absolute;
        top: 0;
        right: -2px;
        height: 100%;
        background: linear-gradient(90deg, transparent, var(--card-primary) 80%);
    }
</style>