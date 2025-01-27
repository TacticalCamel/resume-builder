<script setup lang="ts">
    import { isColorModified, resetColor } from "@/functions/ThemeUtils.ts";
    import { Theme } from "@/models/Theme";
    import EditorSidebarTabItem from "@/components/editor/EditorSidebarTabItem.vue";
    import TabThemePaletteItem from "@/components/editor/TabThemePaletteItem.vue";

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

            <tab-theme-palette-item
                v-for="(color, name) in theme.colors"
                v-model="theme.colors[name]"
                class="px-2 py-0.5 rounded border-2 border-foreground/30"
                :disabled="disabled"
                :modified="isColorModified(name, theme, themeList)"
                :name="name as string"
                @reset="resetColor(name, theme, themeList)"
            />
        </div>
    </editor-sidebar-tab-item>
</template>