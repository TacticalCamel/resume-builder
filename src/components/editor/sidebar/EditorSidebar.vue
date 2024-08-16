<script setup lang="ts">
    import { computed } from "vue";
    import ResumeModel from "@/models/ResumeModel";
    import ThemeSettings from "@/components/editor/sidebar/ThemeSettings.vue";
    import LayoutSettings from "@/components/editor/sidebar/LayoutSettings.vue";
    import FontSettings from "@/components/editor/sidebar/FontSettings.vue";
    import IconDashboard from "@/components/icons/IconDashboard.vue";
    import IconPalette from "@/components/icons/IconPalette.vue";
    import IconText from "@/components/icons/IconText.vue";
    import ExportSettings from "@/components/editor/sidebar/ExportSettings.vue";
    import { settings } from "@/main";
    import IconPublish from "@/components/icons/IconPublish.vue";
    import IconSelect from "@/components/icons/IconSelect.vue";
    import SelectionSettings from "@/components/editor/sidebar/SelectionSettings.vue";

    const resume = defineModel<ResumeModel | null>({
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
            icon: IconPublish,
            component: ExportSettings
        },
        {
            name: 'Selection',
            icon: IconSelect,
            component: SelectionSettings,
            conditional: true
        }
    ];

    const selectedTab = computed(() => {
        const index = settings.tabIndex;

        if(0 <= index && index < tabs.length) {
            return tabs[index].component;
        }

        return undefined;
    });
</script>

<template>
    <div class="flex h-full">
        <!-- tab selection -->
        <div class="editor-tab-list">
            <button
                v-for="(tab, index) in tabs" @click="settings.tabIndex = index"
                class="flex flex-col items-center justify-center gap-1 size-[72px] hover:text-opacity-100 transition-colors relative z-10"
                :class="{'text-foreground': !tab.conditional, 'text-secondary': tab.conditional, 'text-opacity-70': index !== settings.tabIndex }"
            >
                <component :is="tab.icon" class="size-6"/>
                <span class="text-xs">{{ tab.name }}</span>
            </button>

            <span :style="{top: `${-8 + settings.tabIndex * 72}px`}">
                <span class="-bottom-2"/>
                <span class="-top-2"/>
            </span>
        </div>

        <!-- tab contents -->
        <div class="editor-tab-container scrollbar overflow-y-auto">
            <transition name="fade" mode="out-in">
                <component :is="selectedTab" v-model:resume="resume"/>
            </transition>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
    .editor-tab-list {
        @apply relative overflow-clip flex flex-col;
        background-color: color-mix(in srgb, rgb(var(--background)) 60%, black);
    }

    .editor-tab-list > span {
        @apply absolute w-full h-[88px] bg-background pointer-events-none transition-all;
    }

    .editor-tab-list > span > span {
        @apply absolute w-full h-4 rounded-e-full;
        background-color: color-mix(in srgb, rgb(var(--background)) 60%, black);
    }

    .editor-tab-container {
        @apply grow p-4 border-e border-e-foreground/10;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 150ms ease-in-out;
    }

    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
</style>