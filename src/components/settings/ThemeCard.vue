<script setup lang="ts">
    import {computed, PropType} from "vue";
    import Theme from '@/models/themes/Theme';
    import Color from "@/models/themes/Color";
    import { themeService } from "@/main";

    const props = defineProps({
        theme: {
            type: Object as PropType<Theme>,
            required: true
        }
    });

    const colors = computed<string[]>(() => [
        colorForKey('--primary'),
        colorForKey('--background'),
        colorForKey('--accent')
    ]);

    function colorForKey(key: string): string {
        const color: Color | undefined = props.theme?.colors.find(c => c.name === key) ?? themeService.defaultThemes[0]?.colors.find(c => c.name === key);

        return color?.value ?? '0 0 0';
    }
</script>

<template>
    <div class="flex justify-between pe-4 bg-opacity-0 hover:bg-opacity-10 bg-primary rounded items-center transition-colors">
        <div class="">
            {{ props.theme.name }}
        </div>
        <div class="flex h-5 skew-x-[-24deg] border border-primary">
            <div v-for="color in colors" class="w-8" :style="{background: `rgb(${color})`}"></div>
        </div>
    </div>
</template>