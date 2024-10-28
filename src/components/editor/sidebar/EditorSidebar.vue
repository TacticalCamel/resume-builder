<script setup lang="ts">
    import { computed } from "vue";
    import { usePersistentRef } from "@/composables/usePersistentRef";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import { SaveState } from "@/models/SaveState";
    import { EditorTabInfo } from "@/models/bindings/EditorTabInfo";
    import SaveStatus from "@/components/editor/sidebar/reusable/SaveStatus.vue";
    import LayoutTab from "@/components/editor/sidebar/tabs/LayoutTab.vue";
    import ThemeTab from "@/components/editor/sidebar/tabs/ThemeTab.vue";
    import FontTab from "@/components/editor/sidebar/tabs/FontTab.vue";
    import StyleTab from "@/components/editor/sidebar/tabs/StyleTab.vue";
    import TransferTab from "@/components/editor/sidebar/tabs/TransferTab.vue";
    import FadeTransition from "@/components/shared/transition/FadeTransition.vue";
    import IconDashboard from "@/components/shared/icons/IconDashboard.vue";
    import IconPalette from "@/components/shared/icons/IconPalette.vue";
    import IconText from "@/components/shared/icons/IconText.vue";
    import IconCode from "@/components/shared/icons/IconCode.vue";
    import IconSwapHorizontal from "@/components/shared/icons/IconSwapHorizontal.vue";

    const template = defineModel<ResumeTemplate>({
        required: true
    });

    const {saveState} = defineProps<{
        saveState: SaveState
    }>();

    const activeTab = usePersistentRef<number>('active-tab', 0);

    const activeTabComponent = computed(() => {
        const index = activeTab.value;

        if (0 <= index && index < tabs.length) {
            return tabs[index].component;
        }

        return undefined;
    });

    const tabs: EditorTabInfo[] = [
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
            name: 'Style',
            icon: IconCode,
            component: StyleTab
        },
        {
            name: 'Transfer',
            icon: IconSwapHorizontal,
            component: TransferTab
        }
    ];
</script>

<template>
    <div class="flex h-full">
        <div class="relative flex flex-col overflow-clip bg-black/40">
            <button
                v-for="(tab, index) in tabs" @click="activeTab = index"
                class="flex flex-col items-center justify-center gap-1 size-[72px] transition-colors z-10 hover:opacity-100"
                :class="{'text-secondary': index === activeTab }"
            >
                <component :is="tab.icon" class="size-6"/>
                <span class="text-xs">{{ tab.name }}</span>
            </button>

            <span class="absolute w-full h-[88px] bg-background pointer-events-none transition-all" :style="{top: `${-8 + activeTab * 72}px`}">
                <span class="side-cover -bottom-2"/>
                <span class="side-cover -top-2"/>
            </span>
        </div>

        <div class="flex flex-col grow border-e border-foreground/20">
            <div class="grow p-4 scrollbar overflow-y-auto">
                <fade-transition>
                    <keep-alive>
                        <component :is="activeTabComponent" v-model="template"/>
                    </keep-alive>
                </fade-transition>
            </div>
            <div class="px-2 py-0.5 bg-foreground/5">
                <save-status :state="saveState" :id="template.id"/>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
    .side-cover {
        @apply absolute w-full h-4 rounded-e-full bg-background;

        &:after {
            @apply content-[''] absolute inset-0 bg-black/40 rounded-e-full;
        }
    }
</style>