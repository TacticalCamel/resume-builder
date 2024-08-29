<script setup lang="ts">
    import { ref } from "vue";
    import draggable from "vuedraggable";
    import { themeService } from "@/main";
    import { canDragToList } from "@/models/BuildingBlock";
    import Theme from "@/models/Theme";
    import ThemeCard from "@/components/editor/sidebar/ThemeCard.vue";
    import ColorPicker from "@/components/editor/sidebar/ColorPicker.vue";
    import EditorTab from "@/components/editor/sidebar/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/EditorTabItem.vue";
    import InputRange from "@/components/shared/InputRange.vue";
    import IconDelete from "@/components/icons/IconDelete.vue";
    import IconSwapVert from "@/components/icons/IconSwapVert.vue";
    import IconCheck from "@/components/icons/IconCheck.vue";
    import IconClose from "@/components/icons/IconClose.vue";
    import SettingsModel from "@/models/SettingsModel";

    const deleteConfirmOpen = ref<boolean>(false);
    const themeSelectOpen = ref<boolean>(false);
    const newTheme = ref<Theme | undefined>(undefined);

    const settings = defineModel<SettingsModel>('settings', {
        required: true
    });

    function setTheme(theme: Theme): void {
        themeService.currentTheme = theme;
        themeSelectOpen.value = false;
    }

    function createTheme(apply: boolean): void {
        // check if there is a valid value
        if(!newTheme.value) {
            return;
        }

        // find the selected base theme
        const baseTheme: Theme = themeService.getBaseTheme(newTheme.value.base) ?? themeService.defaultLightTheme;

        // copy the colors of the base theme
        newTheme.value.colors = baseTheme.colors.map(color => ({...color}));

        // add the new theme to the list
        themeService.themes.push(newTheme.value);

        if (apply) {
            // apply the new theme
            themeService.currentTheme = newTheme.value;

            // close theme select
            themeSelectOpen.value = false;

            // clear the new theme value
            newTheme.value = undefined;
        }
        else {
            // clear form
            newTheme.value = {
                id: crypto.randomUUID(),
                name: '',
                base: undefined,
                colors: [],
            };
        }
    }

    function deleteCurrentTheme() {
        const id = themeService.currentTheme.id;

        const index = themeService.themes.findIndex(theme => theme.id === id);

        if (index === -1) {
            return;
        }

        // delete the theme
        themeService.themes.splice(index, 1);

        // close the confirm dialog
        deleteConfirmOpen.value = false;

        // erase this theme as a base theme from all other themes
        themeService.themes.forEach(theme => {
            if (theme.base === id) {
                theme.base = undefined;
            }
        });
    }

    function openThemeSelect() {
        themeSelectOpen.value = true;

        if(newTheme.value) {
            return;
        }

        newTheme.value = {
            id: crypto.randomUUID(),
            name: '',
            base: undefined,
            colors: [],
        };
    }
</script>

<template>
    <editor-tab v-if="themeSelectOpen">
        <editor-tab-item>
            <div class="flex justify-end">
                <button @click="themeSelectOpen = false" class="px-2 py-1">
                    <icon-close class="size-6"/>
                </button>
            </div>
        </editor-tab-item>

        <editor-tab-item v-if="newTheme" title="Create new theme">
            <div class="grid gap-4 font-light text-sm">
                <div class="grid grid-cols-2 items-center gap-2 text-nowrap font-light">
                    <label>Name</label>
                    <input
                        type="text"
                        v-model="newTheme.name"
                        class="bg-transparent rounded outline outline-1 outline-foreground/30 py-0.5 px-2 disabled:text-foreground/50 disabled:cursor-not-allowed focus:outline-foreground"
                    />

                    <label>Default color values</label>
                    <select v-model="newTheme.base" class="bg-background rounded outline outline-1 outline-foreground/30 py-0.5 px-1 h-6 opacity-100 disabled:text-foreground/50 disabled:cursor-not-allowed focus:outline-foreground">
                        <option :value="undefined">None</option>
                        <option
                            v-for="theme in [themeService.defaultLightTheme, themeService.defaultDarkTheme, ...themeService.themes]"
                            :value="theme.id"
                        >
                            {{ theme.name }}
                        </option>
                    </select>
                </div>

                <div class="grid grid-cols-2 gap-2">
                    <button @click="createTheme(false)" class="flex justify-center items-center gap-2 p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors">Create</button>
                    <button @click="createTheme(true)" class="flex justify-center items-center gap-2 p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors">Create and apply</button>
                </div>
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
                    :group="{name: 'theme', pull: true, put: canDragToList}"
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
    </editor-tab>

    <editor-tab v-else>
        <editor-tab-item title="filters">
            <div class="grid grid-cols-[auto_1fr] items-center gap-x-8 gap-y-2 text-foreground/70 text-sm font-light">
                <div>Grayscale</div>
                <input-range :min="0" :max="100" :step="5" unit="%" v-model="settings.filters.grayscale"/>

                <div>Contrast</div>
                <input-range :min="50" :max="150" :step="5" unit="%" v-model="settings.filters.contrast"/>

                <div>Brightness</div>
                <input-range :min="50" :max="150" :step="5" unit="%" v-model="settings.filters.brightness"/>
            </div>
        </editor-tab-item>

        <editor-tab-item title="theme">
            <div class="grid text-sm gap-4">
                <!-- change or delete theme -->
                <div class="grid grid-cols-2 gap-2 text-foreground relative">
                    <button
                        @click="openThemeSelect"
                        class="flex justify-center items-center gap-2 p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors">
                        <icon-swap-vert class="size-5"/>
                        <span>Change theme</span>
                    </button>

                    <button
                        @click="deleteConfirmOpen = true"
                        :disabled="themeService.isDefaultThemeSelected"
                        class="flex justify-center items-center gap-2 p-1 rounded bg-foreground/10 hover:bg-foreground/20 disabled:bg-foreground/10 disabled:text-foreground/50 disabled:cursor-not-allowed transition-colors"
                    >
                        <icon-delete class="size-5"/>
                        <span>Delete theme</span>
                    </button>

                    <div v-if="deleteConfirmOpen" class="absolute inset-0 flex items-center gap-2 bg-background pe-1">
                        <div class="me-auto">Delete theme?</div>
                        <button @click="deleteCurrentTheme" class="px-4 bg-secondary/10 hover:bg-secondary/20 transition-colors text-secondary rounded h-full">
                            <icon-check class="size-5"/>
                        </button>
                        <button @click="deleteConfirmOpen = false" class="px-4 bg-primary/10 hover:bg-primary/20 transition-colors text-primary rounded h-full">
                            <icon-close class="size-5"/>
                        </button>
                    </div>
                </div>

                <!-- theme name and base theme -->
                <div class="grid grid-cols-2 items-center gap-2 text-nowrap font-light">
                    <label>Name</label>
                    <input
                        type="text"
                        v-model="themeService.currentTheme.name"
                        :disabled="themeService.isDefaultThemeSelected"
                        class="bg-transparent rounded outline outline-1 outline-foreground/30 py-0.5 px-2 disabled:text-foreground/50 disabled:cursor-not-allowed focus:outline-foreground"
                    />

                    <label>Default color values</label>
                    <select v-model="themeService.currentTheme.base" :disabled="themeService.isDefaultThemeSelected" class="bg-background rounded outline outline-1 outline-foreground/30 py-0.5 px-1 h-6 opacity-100 disabled:text-foreground/50 disabled:cursor-not-allowed focus:outline-foreground">
                        <option :value="undefined">None</option>
                        <option
                            v-for="theme in [themeService.defaultLightTheme, themeService.defaultDarkTheme, ...themeService.themes]"
                            :value="theme.id"
                            :hidden="theme.id === themeService.currentTheme.id"
                        >
                            {{ theme.name }}
                        </option>
                    </select>
                </div>

                <!-- colors -->
                <div class="grid grid-cols-2 gap-2">
                    <label class="col-span-2 font-light">Colors</label>
                    <color-picker
                        v-for="(color, index) in themeService.currentTheme.colors" :key="color.name"
                        v-model="themeService.currentTheme.colors[index]"
                        class="px-2 py-0.5 rounded border-2 border-foreground/30 text-sm"
                    />
                </div>
            </div>
        </editor-tab-item>
    </editor-tab>
</template>