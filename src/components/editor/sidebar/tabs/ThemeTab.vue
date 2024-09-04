<script setup lang="ts">
    import { computed, ref } from "vue";
    import { themeService } from "@/services";
    import Theme from "@/models/style/Theme";
    import ThemeCard from "@/components/editor/sidebar/reusable/ThemeCard.vue";
    import ColorPicker from "@/components/editor/sidebar/reusable/ColorPicker.vue";
    import EditorTab from "@/components/editor/sidebar/generic/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import InputRange from "@/components/shared/form/InputRange.vue";
    import IconDelete from "@/components/shared/icons/IconDelete.vue";
    import IconSwapVert from "@/components/shared/icons/IconSwapVert.vue";
    import IconCheck from "@/components/shared/icons/IconCheck.vue";
    import IconClose from "@/components/shared/icons/IconClose.vue";
    import EditorSettings from "@/models/EditorSettings";

    const deleteConfirmOpen = ref<boolean>(false);
    const themeSelectOpen = ref<boolean>(false);
    const themeCreateForm = ref<{ name: string, base: string | undefined } | undefined>(undefined);

    const settings = defineModel<EditorSettings>('settings', {
        required: true
    });

    function setTheme(theme: Theme): void {
        themeService.currentTheme = theme;
        themeSelectOpen.value = false;
    }

    function createTheme(apply: boolean): void {
        if (!themeCreateForm.value) {
            return;
        }

        const theme: Theme = themeService.createTheme(themeCreateForm.value.name, themeCreateForm.value.base);

        if (apply) {
            themeCreateForm.value = undefined;
            setTheme(theme);
            return;
        }

        themeCreateForm.value = {
            name: '',
            base: undefined,
        };
    }

    function deleteCurrentTheme() {
        const id = themeService.currentTheme.id;

        const index = themeService.customThemes.findIndex(theme => theme.id === id);

        if (index === -1) {
            return;
        }

        // delete the theme
        themeService.customThemes.splice(index, 1);

        // close the confirm dialog
        deleteConfirmOpen.value = false;

        // erase this theme as a base theme from all other themes
        themeService.customThemes.forEach(theme => {
            if (theme.base === id) {
                theme.base = undefined;
            }
        });
    }

    function openThemeSelect() {
        themeSelectOpen.value = true;

        if (themeCreateForm.value) {
            return;
        }

        themeCreateForm.value = {
            name: '',
            base: undefined
        };
    }

    const isDefaultCurrentTheme = computed<boolean>(() => {
        const theme: Theme = themeService.currentTheme;

        for (const key in themeService.defaultThemes) {
            if (themeService.defaultThemes[key].id === theme.id) {
                return true;
            }
        }

        return false;
    });
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

        <editor-tab-item v-if="themeCreateForm" title="Create new theme">
            <div class="grid gap-4 font-light text-sm">
                <div class="grid grid-cols-2 items-center gap-2 text-nowrap font-light">
                    <label>Name</label>
                    <input
                        type="text"
                        v-model="themeCreateForm.name"
                        class="bg-transparent rounded outline outline-1 outline-foreground/30 py-0.5 px-2 disabled:text-foreground/50 disabled:cursor-not-allowed focus:outline-foreground"
                    />

                    <label>Default color values</label>
                    <select v-model="themeCreateForm.base" class="bg-background rounded outline outline-1 outline-foreground/30 py-0.5 px-1 h-6 opacity-100 disabled:text-foreground/50 disabled:cursor-not-allowed focus:outline-foreground">
                        <option :value="undefined">None</option>
                        <option
                            v-for="theme in themeService.allThemes"
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
            <div class="grid gap-3">
                <theme-card
                    v-for="theme in themeService.allThemes"
                    @click="setTheme(theme)"
                    :theme="theme"
                    :is-default="themeService.defaultThemes.light.id === theme.id || themeService.defaultThemes.dark.id === theme.id"
                    :is-active="themeService.currentTheme.id === theme.id"
                />
            </div>
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
                <div class="grid grid-cols-2 gap-2 text-foreground relative">
                    <button
                        @click="openThemeSelect"
                        class="flex justify-center items-center gap-2 p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors">
                        <icon-swap-vert class="size-5"/>
                        <span>Change theme</span>
                    </button>

                    <button
                        @click="deleteConfirmOpen = true"
                        :disabled="isDefaultCurrentTheme"
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

                <div class="grid grid-cols-2 items-center gap-2 text-nowrap font-light">
                    <label>Name</label>
                    <input
                        type="text"
                        v-model="themeService.currentTheme.name"
                        :disabled="isDefaultCurrentTheme"
                        class="bg-transparent rounded outline outline-1 outline-foreground/30 py-0.5 px-2 disabled:text-foreground/50 disabled:cursor-not-allowed focus:outline-foreground"
                    />

                    <label>Default color values</label>
                    <select v-model="themeService.currentTheme.base" :disabled="isDefaultCurrentTheme" class="bg-background rounded outline outline-1 outline-foreground/30 py-0.5 px-1 h-6 opacity-100 disabled:text-foreground/50 disabled:cursor-not-allowed focus:outline-foreground">
                        <option :value="undefined">None</option>
                        <option
                            v-for="theme in themeService.allThemes"
                            :value="theme.id"
                            :hidden="theme.id === themeService.currentTheme.id"
                        >
                            {{ theme.name }}
                        </option>
                    </select>
                </div>

                <div class="grid grid-cols-2 gap-2">
                    <label class="col-span-2 font-light">Colors</label>
                    <color-picker
                        v-for="(color, index) in themeService.currentTheme.colors" :key="color.name"
                        v-model="themeService.currentTheme.colors[index]"
                        class="px-2 py-0.5 rounded border-2 border-foreground/30 text-sm"
                        :disabled="isDefaultCurrentTheme"
                    />
                </div>
            </div>
        </editor-tab-item>
    </editor-tab>
</template>