<script setup lang="ts">
    import draggable from "vuedraggable";
    import { checkGroupMatch } from "@/models/BuildingBlock";
    import { settings, themeService } from "@/main";
    import Theme from "@/models/Theme";
    import ThemeCard from "@/components/editor/sidebar/ThemeCard.vue";
    import ColorPicker from "@/components/editor/sidebar/ColorPicker.vue";
    import EditorTab from "@/components/editor/sidebar/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/EditorTabItem.vue";
    import { createDefaultDarkTheme } from "@/services/ThemeService";
    import InputRange from "@/components/shared/InputRange.vue";
    import InputText from "@/components/shared/InputText.vue";
    import InputCheckbox from "@/components/shared/InputCheckbox.vue";

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
        <editor-tab-item title="filters">
            <div class="grid grid-cols-[auto_1fr] items-center gap-4 text-foreground/70 text-sm font-light">
                <div>Grayscale</div>
                <input-range :min="0" :max="100" :step="5" unit="%" v-model="settings.filters.grayscale"/>

                <div>Contrast</div>
                <input-range :min="50" :max="150" :step="5" unit="%" v-model="settings.filters.contrast"/>

                <div>Brightness</div>
                <input-range :min="50" :max="150" :step="5" unit="%" v-model="settings.filters.brightness"/>
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

        <editor-tab-item title="current theme">
            <!-- selected theme can not be edited -->
            <div v-if="themeService.defaultThemeSelected">
                <div class="italic opacity-70 text-sm">
                    Select a custom theme to edit colors.
                </div>
            </div>

            <!-- color list -->
            <div v-else class="grid text-sm gap-1">
                <div class="flex justify-between items-center gap-2 pe-2">
                    <span>Theme name</span>
                    <input-text v-model="themeService.currentTheme.name"/>
                </div>

                <input-checkbox v-model="themeService.currentTheme.isDark" class="my-1">Inherit dark colors</input-checkbox>

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