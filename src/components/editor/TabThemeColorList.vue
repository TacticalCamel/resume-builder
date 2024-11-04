<script setup lang="ts">
    import { isColorModified, resetColor } from "@/functions/Themes";
    import { Theme } from "@/models/style/Theme";
    import EditorSidebarTabItem from "@/components/editor/EditorSidebarTabItem.vue";
    import TabThemeColorListItem from "@/components/editor/TabThemeColorListItem.vue";

    const theme = defineModel<Theme>({
        required: true
    });

    const {themeList, disabled} = defineProps<{
        themeList: Theme[]
        disabled: boolean
    }>();
</script>

<template>
    <editor-sidebar-tab-item>
        <div class="grid grid-cols-2 gap-2">
            <label class="col-span-2">Colors</label>

            <tab-theme-color-list-item
                v-for="(color, index) in theme.colors"
                v-model="theme.colors[index]"
                class="px-2 py-0.5 rounded border-2 border-foreground/30"
                :key="color.name"
                :disabled="disabled"
                :modified="isColorModified(color, theme, themeList)"
                @reset="resetColor(color, theme, themeList)"
            />
        </div>
    </editor-sidebar-tab-item>
</template>