<script setup lang="ts">
    import { computed } from "vue";
    import { useLocalstorageRef } from "@/composables/useLocalstorageRef";
    import { useEditor } from "@/composables/useEditor";
    import { TemplateModel } from "@/models/Template";
    import { EditorTabInfo } from "@/models/bindings/EditorTabInfo";
    import EditorSidebarStatus from "@/components/editor/EditorSidebarStatus.vue";
    import TabLayout from "@/components/editor/TabLayout.vue";
    import TabTheme from "@/components/editor/TabTheme.vue";
    import TabFont from "@/components/editor/TabFont.vue";
    import TabStyle from "@/components/editor/TabStyle.vue";
    import TabTransfer from "@/components/editor/TabTransfer.vue";
    import TransitionFade from "@/components/shared/TransitionFade.vue";
    import IconDashboard from "@/components/shared/IconDashboard.vue";
    import IconPalette from "@/components/shared/IconPalette.vue";
    import IconText from "@/components/shared/IconText.vue";
    import IconCode from "@/components/shared/IconCode.vue";
    import IconSwapHorizontal from "@/components/shared/IconSwapHorizontal.vue";
    import EditorSidebarControls from "@/components/editor/EditorSidebarControls.vue";

    const template = defineModel<TemplateModel>({
        required: true
    });

    const {autosaveState} = useEditor();

    const activeTab = useLocalstorageRef<number>('active-tab', 0);

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
            component: TabLayout
        },
        {
            name: 'Colors',
            icon: IconPalette,
            component: TabTheme
        },
        {
            name: 'Text',
            icon: IconText,
            component: TabFont
        },
        {
            name: 'Style',
            icon: IconCode,
            component: TabStyle
        },
        {
            name: 'Transfer',
            icon: IconSwapHorizontal,
            component: TabTransfer
        }
    ];
</script>

<template>
    <div class="flex">
        <editor-sidebar-controls
            v-model="activeTab"
            :tabs="tabs"
        />

        <div class="flex flex-col grow border-e border-foreground/20">
            <div class="grow p-4 scrollbar overflow-y-auto">
                <transition-fade>
                    <keep-alive>
                        <component :is="activeTabComponent" v-model="template"/>
                    </keep-alive>
                </transition-fade>
            </div>

            <div class="px-2 py-0.5 bg-foreground/5">
                <editor-sidebar-status
                    :state="autosaveState"
                    :id="template.id"
                />
            </div>
        </div>
    </div>
</template>