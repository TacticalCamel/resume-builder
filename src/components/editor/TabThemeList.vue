<script setup lang="ts">
    import { computed } from "vue";
    import { defaultThemes } from "@/functions/ThemeUtils.ts";
    import { TemplateModel } from "@/models/Template";
    import { Theme } from "@/models/Theme";
    import TabThemeListItem from "@/components/editor/TabThemeListItem.vue";
    import EditorSidebarTabItem from "@/components/editor/EditorSidebarTabItem.vue";

    const template = defineModel<TemplateModel>({
        required: true
    });

    const availableThemes = computed<Theme[]>(() => {
        return [defaultThemes.light, defaultThemes.dark, ...template.value.themes];
    });

    function setTheme(theme: Theme): void {
        template.value.currentTheme = theme.id;
    }
</script>

<template>
    <editor-sidebar-tab-item title="available themes">
        <div class="grid gap-3">
            <tab-theme-list-item
                v-for="theme in availableThemes"
                @click="setTheme(theme)"
                :theme="theme"
                :active="theme.id === template.currentTheme"
            />
        </div>
    </editor-sidebar-tab-item>
</template>