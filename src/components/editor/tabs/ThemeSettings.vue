<script setup lang="ts">
    import draggable from "vuedraggable";
    import { checkGroupMatch } from "@/models/BuildingBlock";
    import { settings, themeService } from "@/main";
    import Theme from "@/models/Theme";
    import ThemeCard from "@/components/editor/ThemeCard.vue";
    import ColorPicker from "@/components/editor/ColorPicker.vue";
    import ToggleSwitch from "@/components/shared/ToggleSwitch.vue";
    import EditorTab from "@/components/editor/tabs/EditorTab.vue";
    import EditorTabItem from "@/components/editor/tabs/EditorTabItem.vue";
    import { createDefaultDarkTheme } from "@/services/ThemeService";
    import Checkbox from "@/components/shared/Checkbox.vue";

    function setTheme(theme: Theme): void {
        themeService.currentTheme = theme;
    }

    function onThemeDelete() {
        themeService.applyTheme(themeService.currentTheme);
    }

    function createTheme() {
        const theme = createDefaultDarkTheme();

        theme.id = 'theme-' + themeService.themes.length;
        theme.name = 'theme-' + themeService.themes.length;

        themeService.themes.push(theme);
    }
</script>

<template>
    <editor-tab>
        <editor-tab-item>
            <div class="mb-1">TODO</div>
            <div class="text-foreground/70 text-sm">More filters</div>
        </editor-tab-item>

        <editor-tab-item>
            <div class="mb-1">TODO</div>
            <div class="text-foreground/70 text-sm">Theme rename</div>
        </editor-tab-item>

        <editor-tab-item @click="createTheme">
            <div class="mb-1">TODO</div>
            <div class="text-foreground/70 text-sm">Theme creation and deletion</div>
        </editor-tab-item>

        <editor-tab-item title="filters">
            <div class="flex justify-between items-center text-sm pe-1 py-0.5">
                <div>Grayscale</div>
                <toggle-switch v-model="settings.monochrome"/>
            </div>
        </editor-tab-item>

        <editor-tab-item title="themes">
            <transition-group>
                <draggable
                    v-model="themeService.themes"
                    item-key="id"
                    key="draggable"
                    drag-class="dragging"
                    ghost-class="ghost"
                    animation="200"
                    class="flex flex-col gap-3"
                    :group="{name: 'theme', pull: true, put: checkGroupMatch}"
                    @remove="onThemeDelete"
                >
                    <template #header>
                        <theme-card
                            v-for="theme in [themeService.defaultLightTheme, themeService.defaultDarkTheme]"
                            @click="setTheme(theme)"
                            :theme="theme"
                            :is-default="true"
                            :is-active="themeService.currentTheme.id === theme.id"
                        />
                    </template>

                    <template #item="{element: theme}: {element: Theme}">
                        <theme-card
                            @click="setTheme(theme)"
                            :theme="theme"
                            :is-active="themeService.currentTheme.id === theme.id"
                        />
                    </template>
                </draggable>
            </transition-group>
        </editor-tab-item>

        <editor-tab-item title="colors">
            <!-- selected theme can not be edited -->
            <div v-if="themeService.defaultThemeSelected">
                <div class="italic opacity-70 text-sm">
                    Select a custom theme to edit colors.
                </div>
            </div>

            <!-- color list -->
            <div v-else class="grid text-sm gap-1">
                <checkbox
                    v-model="themeService.currentTheme.isDark"
                    label="Inherit dark colors"
                    class="my-1"
                />

                <color-picker
                    v-for="(color, index) in themeService.currentTheme.colors" :key="color.name"
                    v-model="themeService.currentTheme.colors[index]"
                    @change="themeService.applyColor(color)"
                    class="px-2 py-0.5 rounded border border-foreground text-sm"
                />
            </div>
        </editor-tab-item>
    </editor-tab>
</template>