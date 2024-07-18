<script setup lang="ts">
    import { ref, watch } from "vue";
    import draggable from "vuedraggable";
    import Theme from "@/models/themes/Theme";
    import EditText from "@/components/shared/EditText.vue";
    import IconSwapVertical from "@/components/icons/settings/IconSwapVertical.vue";
    import ThemeCard from "@/components/settings/ThemeCard.vue";
    import ToggleSwitch from "@/components/shared/ToggleSwitch.vue";
    import { checkGroupMatch } from "@/models/BuildingBlock";
    import { settings } from "@/main";
    import { themeService } from "@/main";

    const themeSelectOpen = ref<boolean>(false);

    const defaultFont: string = 'Arial';

    const availableFonts = [
        'Arial',
        'Georgia',
        'Lucida Sans Unicode',
        'Palatino Linotype',
        'Tahoma',
        'Times New Roman',
        'Trebuchet MS',
        'Verdana'
    ];

    watch(() => settings.currentFont, (font) => {
        if (font) {
            document.documentElement.style.setProperty('--font', font);
        }
        else {
            document.documentElement.style.setProperty('--font', defaultFont);
        }
    });

    function toggleDropdown(): void {
        themeSelectOpen.value = !themeSelectOpen.value;
    }

    // change the current theme
    function setTheme(theme: Theme): void {
        themeService.setCurrentTheme(theme);
        themeSelectOpen.value = false;
    }

    // set the color of a CSS variable
    function setColor(colorName: string, event: Event): void {
        // get the input element
        const input = event.target as HTMLInputElement;

        // convert the color to an RGB string
        const rgb = hex2rgb(input.value);

        // apply the color
        themeService.setColor(colorName, rgb);
    }

    // convert an RGB string to a hex string
    function rgb2hex(rgb: string): string {
        const rgbArr = rgb.split(' ');
        const r = parseInt(rgbArr[0]);
        const g = parseInt(rgbArr[1]);
        const b = parseInt(rgbArr[2]);

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    // convert a hex string to an RGB string
    function hex2rgb(hex: string): string {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);

        return `${r} ${g} ${b}`;
    }
</script>

<template>
    <div class="flex flex-col gap-4 w-80">
        <div class="pb-0.5 px-2 me-1 border-b border-primary border-opacity-50 text-xl">Theming</div>

        <!-- set monochrome mode -->
        <div class="flex px-2 justify-between">
            <div>Monochrome</div>
            <toggle-switch v-model="settings.monochrome"/>
        </div>

        <!-- font selection -->
        <div class="flex px-2 justify-between">
            <div>Font</div>
            <select v-model="settings.currentFont" class="bg-transparent outline outline-2 outline-accent rounded text-primary" :class="{'text-opacity-70 italic': settings.currentFont === defaultFont}">
                <option class="bg-background text-primary text-opacity-70 italic">{{ defaultFont }} (Default)</option>
                <option v-for="font in availableFonts" class="bg-background">{{ font }}</option>
            </select>
        </div>

        <!-- theme selection -->
        <div class="flex gap-4 px-2">
            <div>Theme colors</div>

            <div class="ms-auto">
                <span v-if="themeService.isDefaultTheme" class="text-primary text-opacity-70 italic">{{ themeService.currentTheme.name }}</span>
                <edit-text v-else v-if="themeService.currentTheme" v-model="themeService.currentTheme.name"/>
            </div>

            <button @click="toggleDropdown" class="bg-primary bg-opacity-0 hover:bg-opacity-20 rounded px-2 py-0.5 transition-colors">
                <icon-swap-vertical class="size-5"/>
            </button>
        </div>

        <!-- theme dropdown -->
        <div class="px-2">
            <transition name="slide-down" mode="out-in">
                <!-- theme list -->
                <div v-if="themeSelectOpen">
                    <transition-group>
                        <draggable
                            v-model="themeService.themes"
                            item-key="id"
                            key="draggable"
                            drag-class="dragging"
                            ghost-class="ghost"
                            animation="200"
                            class="flex flex-col gap-1"
                            :group="{name: 'theme', pull: true, put: checkGroupMatch}"
                        >
                            <template #header>
                                <theme-card v-for="theme in themeService.defaultThemes" @click="setTheme(theme)" :theme="theme" class="text-primary text-opacity-70 italic"/>
                            </template>

                            <template #item="{element: theme}: {element: Theme}">
                                <theme-card @click="setTheme(theme)" :theme="theme"/>
                            </template>
                        </draggable>
                    </transition-group>
                </div>

                <!-- selected theme can not be edited -->
                <div v-else-if="themeService.isDefaultTheme">
                    <div class="italic opacity-70">
                        Create or select a custom theme to change colors.
                    </div>
                </div>

                <!-- color list -->
                <div v-else class="outer-grid grid text-sm gap-x-2 font-mono">
                    <div v-for="color in themeService.defaultThemes[0].colors" :key="color.name" class="grid grid-cols-subgrid col-span-3">
                        <div class="flex items-center text-nowrap">
                            {{ color.name.substring(2) }}
                        </div>
                        <div class="flex items-center justify-center gap-1">
                            <input type="color" :value="rgb2hex(themeService.getColor(color))" @change="(e) => setColor(color.name, e)" class="bg-transparent">
                            <span>{{ rgb2hex(themeService.getColor(color)) }}</span>
                        </div>
                        <div class="flex items-center justify-end">
                            <button v-if="themeService.isColorModified(color)" class="px-1 text-error hover:bg-error hover:bg-opacity-20 rounded hover:transition-colors font-semibold" @click="() => themeService.resetColor(color.name)">Reset</button>
                            <span v-else class="px-1 opacity-50">Reset</span>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
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

    .outer-grid {
        grid-template-columns: min-content 1fr min-content;
    }
</style>