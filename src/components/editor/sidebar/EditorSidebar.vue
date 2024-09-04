<script setup lang="ts">
    import { computed } from "vue";
    import { ResumeModel } from "@/models/resume/Resume";
    import EditorSettings from "@/models/EditorSettings";
    import LocalStorageAutosaveService from "@/services/implementations/LocalStorageAutosaveService";
    import LayoutTab from "@/components/editor/sidebar/tabs/LayoutTab.vue";
    import ThemeTab from "@/components/editor/sidebar/tabs/ThemeTab.vue";
    import FontTab from "@/components/editor/sidebar/tabs/FontTab.vue";
    import ExportTab from "@/components/editor/sidebar/tabs/ExportTab.vue";
    import SelectionTab from "@/components/editor/sidebar/tabs/SelectionTab.vue";
    import IconDashboard from "@/components/shared/icons/IconDashboard.vue";
    import IconPalette from "@/components/shared/icons/IconPalette.vue";
    import IconText from "@/components/shared/icons/IconText.vue";
    import IconPublish from "@/components/shared/icons/IconPublish.vue";
    import IconSelect from "@/components/shared/icons/IconSelect.vue";

    const resume = defineModel<ResumeModel | null>('resume', {
        required: true
    });

    const settings = defineModel<EditorSettings>('settings', {
        required: true
    });

    const activeTab = new LocalStorageAutosaveService<number>('active-editor-tab', () => 0);

    const activeTabComponent = computed(() => {
        const index = activeTab.value;

        if (0 <= index && index < tabs.length) {
            return tabs[index].component;
        }

        return undefined;
    });

    const tabs = [
        {
            name: 'Layout',
            icon: IconDashboard,
            component: LayoutTab
        },
        {
            name: 'Colors',
            icon: IconPalette,
            component: ThemeTab
        },
        {
            name: 'Text',
            icon: IconText,
            component: FontTab
        },
        {
            name: 'Export',
            icon: IconPublish,
            component: ExportTab
        },
        {
            name: 'Selection',
            icon: IconSelect,
            component: SelectionTab,
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
                <keep-alive>
                    <component :is="activeTabComponent" v-model:resume="resume" v-model:settings="settings"/>
                </keep-alive>
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