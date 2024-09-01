<script setup lang="ts">
    import { computed } from "vue";
    import ThemeSettings from "@/components/editor/sidebar/ThemeSettings.vue";
    import LayoutSettings from "@/components/editor/sidebar/LayoutSettings.vue";
    import FontSettings from "@/components/editor/sidebar/FontSettings.vue";
    import IconDashboard from "@/components/icons/IconDashboard.vue";
    import IconPalette from "@/components/icons/IconPalette.vue";
    import IconText from "@/components/icons/IconText.vue";
    import ExportSettings from "@/components/editor/sidebar/ExportSettings.vue";
    import IconPublish from "@/components/icons/IconPublish.vue";
    import IconSelect from "@/components/icons/IconSelect.vue";
    import SelectionSettings from "@/components/editor/sidebar/SelectionSettings.vue";
    import ResumeModel from "@/models/resume/ResumeModel";
    import LocalStorageAutosaveService from "@/services/implementations/LocalStorageAutosaveService";
    import EditorSettings from "@/models/EditorSettings";

    const resume = defineModel<ResumeModel | null>('resume', {
        required: true
    });

    const settings = defineModel<EditorSettings>('settings', {
        required: true
    });

    const activeTab = new LocalStorageAutosaveService<number>('active-editor-tab', () => 0);

    const activeTabComponent = computed(() => {
        const index = activeTab.value;

        if(0 <= index && index < tabs.length) {
            return tabs[index].component;
        }

        return undefined;
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
</script>

<template>
    <div class="flex h-full">
        <div class="relative flex flex-col overflow-clip bg-darker">
            <button
                v-for="(tab, index) in tabs" @click="activeTab.value = index"
                class="flex flex-col items-center justify-center gap-1 size-[72px] hover:text-opacity-100 transition-colors relative z-10"
                :class="{'text-foreground': !tab.conditional, 'text-secondary': tab.conditional, 'text-opacity-70': index !== activeTab.value }"
            >
                <component :is="tab.icon" class="size-6"/>
                <span class="text-xs">{{ tab.name }}</span>
            </button>

            <span class="absolute w-full h-[88px] bg-background pointer-events-none transition-all" :style="{top: `${-8 + activeTab.value * 72}px`}">
                <span class="absolute w-full h-4 rounded-e-full bg-darker -bottom-2"/>
                <span class="absolute w-full h-4 rounded-e-full bg-darker -top-2"/>
            </span>
        </div>

        <div class="grow p-4 border-e border-e-foreground/10 scrollbar overflow-y-auto">
            <transition name="fade" mode="out-in">
                <component :is="activeTabComponent" v-model:resume="resume" v-model:settings="settings"/>
            </transition>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
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