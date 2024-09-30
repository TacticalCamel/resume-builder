<script setup lang="ts">
    import { ref } from "vue";
    import { useTemplate } from "@/composables/Template";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import { Theme } from "@/models/style/Theme";
    import ThemeCard from "@/components/editor/sidebar/reusable/ThemeCard.vue";
    import ColorPicker from "@/components/editor/sidebar/reusable/ColorPicker.vue";
    import EditorTab from "@/components/editor/sidebar/generic/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import IconDelete from "@/components/shared/icons/IconDelete.vue";
    import IconSwapVert from "@/components/shared/icons/IconSwapVert.vue";
    import IconCheck from "@/components/shared/icons/IconCheck.vue";
    import IconClose from "@/components/shared/icons/IconClose.vue";
    import FadeTransition from "@/components/shared/transition/FadeTransition.vue";
    import TemplateFilters from "@/components/editor/sidebar/items/TemplateFilters.vue";

    const template = defineModel<ResumeTemplate>({
        required: true
    });

    const {hasDefaultThemeSelected, availableThemes, currentTheme, addTheme, isColorModified, resetColor} = useTemplate(template);

    const deleteDialogOpen = ref<boolean>(false);
    const themeSelectOpen = ref<boolean>(false);
    const themeCreateForm = ref<{ name: string, base: string | undefined } | undefined>(undefined);

    function createTheme(apply: boolean) {
        if (!themeCreateForm.value) {
            return;
        }

        const theme: Theme = addTheme(themeCreateForm.value.name, themeCreateForm.value.base);

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

    function setTheme(theme: Theme): void {
        template.value.currentTheme = theme.id;
    }

    function deleteCurrentTheme() {
        const id = template.value.currentTheme;

        const index = template.value.themes.findIndex(theme => theme.id === id);

        if (index === -1) {
            return;
        }

        // delete the theme
        template.value.themes.splice(index, 1);

        // close the confirm dialog
        deleteDialogOpen.value = false;

        // erase this theme as a base theme from all other themes
        template.value.themes.forEach(theme => {
            if (theme.base === id) {
                theme.base = undefined;
            }
        });
    }

    function openThemeSelect() {
        themeSelectOpen.value = !themeSelectOpen.value;

        if (themeCreateForm.value) {
            return;
        }

        themeCreateForm.value = {
            name: '',
            base: undefined
        };
    }
</script>

<template>
    <editor-tab>
        <template-filters v-model="template.filters"/>

        <editor-tab-item title="theme">
            <div class="grid grid-cols-2 gap-2 text-foreground relative">
                <button
                    @click="openThemeSelect"
                    class="flex justify-center items-center gap-2 p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors">
                    <icon-swap-vert class="size-5"/>
                    <span>Change theme</span>
                </button>

                <button
                    @click="deleteDialogOpen = true"
                    :disabled="hasDefaultThemeSelected || themeSelectOpen"
                    class="flex justify-center items-center gap-2 p-1 rounded bg-foreground/10 hover:bg-foreground/20 disabled:bg-foreground/10 disabled:text-foreground/50 disabled:cursor-not-allowed transition-colors"
                >
                    <icon-delete class="size-5"/>
                    <span>Delete theme</span>
                </button>

                <div v-if="deleteDialogOpen" class="absolute inset-0 flex items-center gap-2 bg-background pe-1">
                    <div class="me-auto">Delete theme?</div>
                    <button @click="deleteCurrentTheme" class="px-4 bg-secondary/10 hover:bg-secondary/20 transition-colors text-secondary rounded h-full">
                        <icon-check class="size-5"/>
                    </button>
                    <button @click="deleteDialogOpen = false" class="px-4 bg-primary/10 hover:bg-primary/20 transition-colors text-primary rounded h-full">
                        <icon-close class="size-5"/>
                    </button>
                </div>
            </div>
        </editor-tab-item>

        <fade-transition>
            <div v-if="themeSelectOpen" class="grid grid-rows-subgrid row-span-2">
                <editor-tab-item v-if="themeCreateForm" title="create new theme">
                    <div class="grid gap-4">
                        <div class="grid grid-cols-2 items-center gap-2 text-nowrap font-light">
                            <label>Name</label>
                            <input
                                type="text"
                                v-model="themeCreateForm.name"
                                class="bg-transparent rounded outline outline-1 outline-foreground/30 py-0.5 px-2 disabled:text-foreground/50 disabled:cursor-not-allowed focus:outline-foreground"
                            />

                            <label>Default color values</label>
                            <select v-model="themeCreateForm.base"
                                    class="bg-background rounded outline outline-1 outline-foreground/30 py-0.5 px-1 h-6 opacity-100 disabled:text-foreground/50 disabled:cursor-not-allowed focus:outline-foreground">
                                <option :value="undefined">None</option>
                                <option
                                    v-for="theme in availableThemes"
                                    :value="theme.id"
                                >
                                    {{ theme.name }}
                                </option>
                            </select>
                        </div>

                        <div class="grid grid-cols-2 gap-2 font-medium">
                            <button @click="createTheme(false)" class="flex justify-center items-center gap-2 p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors">Create</button>
                            <button @click="createTheme(true)" class="flex justify-center items-center gap-2 p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors">Create and apply</button>
                        </div>
                    </div>
                </editor-tab-item>

                <editor-tab-item title="available themes">
                    <div class="grid gap-3">
                        <theme-card
                            v-for="theme in availableThemes"
                            @click="setTheme(theme)"
                            :theme="theme"
                            :active="theme.id === template.currentTheme"
                        />
                    </div>
                </editor-tab-item>
            </div>

            <div v-else class="grid grid-rows-subgrid row-span-2">
                <editor-tab-item>
                    <div class="grid grid-cols-2 items-center gap-2 text-nowrap">
                        <label>Name</label>
                        <input
                            type="text"
                            v-model="currentTheme.name"
                            :disabled="hasDefaultThemeSelected"
                            class="bg-transparent rounded outline outline-1 outline-foreground/30 py-0.5 px-2 disabled:text-foreground/50 disabled:cursor-not-allowed focus:outline-foreground"
                        />

                        <label>Default color values</label>
                        <select
                            v-model="currentTheme.base"
                            :disabled="hasDefaultThemeSelected"
                            class="bg-background rounded outline outline-1 outline-foreground/30 py-0.5 px-1 h-6 opacity-100 disabled:text-foreground/50 disabled:cursor-not-allowed focus:outline-foreground"
                        >
                            <option :value="undefined">None</option>
                            <option
                                v-for="theme in availableThemes"
                                :value="theme.id"
                                :hidden="theme.id === currentTheme.id"
                            >
                                {{ theme.name }}
                            </option>
                        </select>
                    </div>
                </editor-tab-item>

                <editor-tab-item>
                    <div class="grid grid-cols-2 gap-2">
                        <label class="col-span-2">Colors</label>
                        <color-picker
                            v-for="(color, index) in currentTheme.colors"
                            v-model="currentTheme.colors[index]"
                            class="px-2 py-0.5 rounded border-2 border-foreground/30"
                            :key="color.name"
                            :disabled="hasDefaultThemeSelected"
                            :modified="isColorModified(color)"
                            @reset="resetColor(color)"
                        />
                    </div>
                </editor-tab-item>
            </div>
        </fade-transition>
    </editor-tab>
</template>