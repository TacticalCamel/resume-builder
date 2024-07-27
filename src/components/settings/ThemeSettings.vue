<script setup lang="ts">
    import { ref } from "vue";
    import draggable from "vuedraggable";
    import { checkGroupMatch } from "@/models/BuildingBlock";
    import { themeService } from "@/main";
    import Theme from "@/models/Theme";
    import EditText from "@/components/shared/EditText.vue";
    import IconSwapVertical from "@/components/icons/IconSwapVertical.vue";
    import ThemeCard from "@/components/settings/ThemeCard.vue";
    import ColorPicker from "@/components/settings/ColorPicker.vue";
    import IconPalette from "@/components/icons/IconPalette.vue";

    const dropdownOpen = ref<boolean>(false);

    function toggleDropdown(): void {
        dropdownOpen.value = !dropdownOpen.value;
    }

    function setTheme(theme: Theme): void {
        themeService.currentTheme = theme;
        dropdownOpen.value = false;
    }

    function onThemeDelete() {
        themeService.applyTheme(themeService.currentTheme);
    }
</script>

<template>
    <div>
        <!-- theme selection -->
        <div class="flex justify-between items-center gap-4 mb-2">
            <div class="flex gap-2 items-center">
                <icon-palette class="size-6"/>
                <span>Theme</span>
            </div>

            <div class="flex gap-2 rounded border-2 border-primary">
                <div class="px-2 flex items-center text-sm">
                    <span v-if="themeService.defaultThemeSelected">{{ themeService.currentTheme.name }}</span>
                    <edit-text v-else v-model="themeService.currentTheme.name" placeholder="Theme name"/>
                </div>

                <button @click="toggleDropdown" class="hover:bg-primary px-2 py-0.5 transition-colors">
                    <icon-swap-vertical class="size-5"/>
                </button>
            </div>
        </div>

        <!-- theme dropdown -->
        <transition name="slide-down" mode="out-in">
            <!-- theme list -->
            <div v-if="dropdownOpen">
                <transition-group>
                    <draggable
                        v-model="themeService.themes"
                        item-key="id"
                        key="draggable"
                        drag-class="dragging"
                        ghost-class="ghost"
                        animation="200"
                        class="flex flex-col gap-1.5"
                        :group="{name: 'theme', pull: true, put: checkGroupMatch}"
                        @remove="onThemeDelete"
                    >
                        <template #header>
                            <theme-card v-for="theme in [themeService.defaultLightTheme, themeService.defaultDarkTheme]" @click="setTheme(theme)" :theme="theme" :is-default="true"/>
                        </template>

                        <template #item="{element: theme}: {element: Theme}">
                            <theme-card @click="setTheme(theme)" :theme="theme"/>
                        </template>
                    </draggable>
                </transition-group>
            </div>

            <!-- selected theme can not be edited -->
            <div v-else-if="themeService.defaultThemeSelected">
                <div class="italic opacity-70 text-sm">
                    Create or select a custom theme to edit colors.
                </div>
            </div>

            <!-- color list -->
            <div v-else class="grid text-sm gap-1">
                <div class="flex items-center my-1">
                    <input type="checkbox" id="theme-inherit-checkbox" v-model="themeService.currentTheme.isDark" class="size-4 accent-primary"/>
                    <label for="theme-inherit-checkbox" class="select-none ps-2">Inherit dark colors</label>
                </div>

                <div v-for="(color, index) in themeService.currentTheme.colors" :key="color.name" class="flex items-center gap-4">
                    <div class="text-nowrap">
                        {{ color.name.substring(2) }}
                    </div>

                    <color-picker
                        v-model="themeService.currentTheme.colors[index]"
                        @change="themeService.applyColor(color)"
                        class="ms-auto px-2 rounded border border-foreground"
                    />

                    <div class="flex items-center">
                        <button v-if="themeService.isColorModified(color)" class="px-2 text-error hover:bg-error hover:bg-opacity-20 rounded hover:transition-colors font-semibold" @click="themeService.resetColor(color)">Reset</button>
                        <span v-else class="px-2 opacity-60">Reset</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .slide-down-enter-active, .slide-down-leave-active {
        transition: all 150ms ease-in-out;
    }

    .slide-down-enter-from, .slide-down-leave-to {
        opacity: 0;
        transform: translate(0, -1rem);
    }
</style>