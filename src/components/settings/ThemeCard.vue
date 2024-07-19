<script setup lang="ts">
    import { PropType, reactive } from "vue";
    import Theme from '@/models/themes/Theme';
    import Color from "@/models/themes/Color";

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
        <div class="relative me-6 h-7 overflow-y-clip" :style="cardStyle">
            <div class="theme-card-text w-full flex items-center gap-2 rounded border-primary border-2 px-2">
                <span v-if="isDefault" class="text-sm font-thin font-mono">[DEFAULT]</span>
                <span v-if="theme.name.length">{{ theme.name }}</span>
                <span v-else class="italic opacity-70">Unnamed</span>
            </div>
            <div class="theme-card-accent w-2/5 -right-2 skew-x-[-24deg] border-primary border-2 border-s-0 pointer-events-none"/>
        </div>
    </div>
</template>

<style scoped>
    :root {
        --card-primary: none;
        --card-background: none;
        --card-accent: none;
    }

    .theme-card-text, .theme-card-accent {
        position: absolute;
        top: 0;
        height: 100%;
    }

    .theme-card-text {
        background-color: var(--card-background);
        color: var(--card-primary);
        transition: background-color 150ms ease-in-out;
    }

    .theme-card-text:hover {
        background: var(--card-accent);
    }

    .theme-card-accent {
        background: linear-gradient(90deg, transparent, var(--card-accent) 80%);
    }
</style>