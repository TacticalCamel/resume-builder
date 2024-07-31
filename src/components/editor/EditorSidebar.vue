<script setup lang="ts">
    import ResumeModel from "@/models/ResumeModel";
    import ThemeSettings from "@/components/editor/tabs/ThemeSettings.vue";
    import LayoutSettings from "@/components/editor/tabs/LayoutSettings.vue";
    import FontSettings from "@/components/editor/tabs/FontSettings.vue";
    import IconSettings from "@/components/icons/IconSettings.vue";
    import IconDashboard from "@/components/icons/IconDashboard.vue";
    import IconPalette from "@/components/icons/IconPalette.vue";
    import IconText from "@/components/icons/IconText.vue";
    import ExportSettings from "@/components/editor/tabs/ExportSettings.vue";
    import { settings } from "@/main";

    const resume = defineModel<ResumeModel | null>('resume', {
        required: true
    });

    const tabs = [
        {
            name: 'Layout',
            icon: IconDashboard,
            component: LayoutSettings
        },
        {
            name: 'Colors',
            icon: IconPalette,
            component: ThemeSettings
        },
        {
            name: 'Text',
            icon: IconText,
            component: FontSettings
        },
        {
            name: 'Export',
            icon: IconSettings,
            component: ExportSettings
        },
    ];
</script>

<template>
    <div class="flex h-full">
        <!-- tab selection -->
        <div class="bg-darker relative overflow-clip">
            <button v-for="(tab, index) in tabs" @click="settings.tabIndex = index" class="flex flex-col items-center justify-center gap-1 size-[72px] hover:text-foreground transition-colors relative z-10" :class="index === settings.tabIndex ? 'text-foreground' : 'text-foreground/70'">
                <component :is="tab.icon" class="size-6"/>
                <span class="text-xs">{{ tab.name }}</span>
            </button>

            <div class="w-full h-[88px] bg-background absolute pointer-events-none transition-all" :style="{top: `${-8 + settings.tabIndex * 72}px`}">
                <div class="absolute h-4 w-full bg-darker -bottom-2 rounded-e-full"/>
                <div class="absolute h-4 w-full bg-darker -top-2 rounded-e-full"/>
            </div>
        </div>

        <!-- tab contents -->
        <div class="w-[22rem] p-4 border-e border-e-foreground/10 scrollbar overflow-y-auto">
            <transition name="fade" mode="out-in">
                <component :is="tabs[settings.tabIndex].component" v-model:resume="resume"/>
            </transition>
        </div>
    </div>
</template>

<style scoped>
    .bg-darker {
        background-color: color-mix(in srgb, rgb(var(--background)) 60%, black);
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 150ms ease-in-out;
    }

    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
</style>