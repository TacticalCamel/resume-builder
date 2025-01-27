<script setup lang="ts">
    import { computed, ref } from "vue";
    import { defaultThemes, findThemeById, isDefaultTheme } from "@/functions/ThemeUtilities";
    import { TemplateModel } from "@/models/Template";
    import { Theme } from "@/models/Theme";
    import EditorSidebarTab from "@/components/editor/EditorSidebarTab.vue";
    import EditorSidebarTabItem from "@/components/editor/EditorSidebarTabItem.vue";
    import TransitionFade from "@/components/shared/TransitionFade.vue";
    import TabThemeListItem from "@/components/editor/TabThemeListItem.vue";
    import InputButton from "@/components/shared/InputButton.vue";
    import TabThemeFilters from "@/components/editor/TabThemeFilters.vue";
    import IconDelete from "@/components/shared/IconDelete.vue";
    import IconSwapVertical from "@/components/shared/IconSwapVertical.vue";
    import IconCheck from "@/components/shared/IconCheck.vue";
    import IconClose from "@/components/shared/IconClose.vue";
    import TabThemePalette from "@/components/editor/TabThemePalette.vue";
    import TabThemeCreate from "@/components/editor/TabThemeCreate.vue";
    import TabThemeList from "@/components/editor/TabThemeList.vue";

    const template = defineModel<TemplateModel>({
        required: true
    });

    const deleteDialogOpen = ref<boolean>(false);
    const themeSelectOpen = ref<boolean>(false);

    const hasDefaultThemeSelected = computed<boolean>(() => isDefaultTheme(template.value.currentTheme));

    const availableThemes = computed<Theme[]>(() => {
        return [defaultThemes.light, defaultThemes.dark, ...template.value.themes];
    });

    const currentTheme = computed(() => {
        return findThemeById(template.value.currentTheme, template.value.themes);
    });

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
</script>

<template>
    <editor-sidebar-tab>
        <tab-theme-filters v-model="template.filters"/>

        <editor-sidebar-tab-item title="theme">
            <div class="grid grid-cols-2 gap-2 text-foreground relative">
                <input-button @click="themeSelectOpen = !themeSelectOpen" class="flex justify-center items-center gap-2">
                    <icon-swap-vertical class="size-5"/>
                    <span>Change theme</span>
                </input-button>

                <input-button @click="deleteDialogOpen = true" :disabled="hasDefaultThemeSelected || themeSelectOpen" class="flex justify-center items-center gap-2">
                    <icon-delete class="size-5"/>
                    <span>Delete theme</span>
                </input-button>

                <div v-if="deleteDialogOpen" class="absolute inset-0 flex items-center gap-2 bg-background pe-1">
                    <div class="me-auto">Delete theme?</div>

                    <input-button @click="deleteCurrentTheme" class="px-4 bg-secondary/10 hover:!bg-secondary/20 text-secondary">
                        <icon-check class="size-5"/>
                    </input-button>

                    <input-button @click="deleteDialogOpen = false" class="px-4 bg-primary/10 hover:!bg-error/20 text-error">
                        <icon-close class="size-5"/>
                    </input-button>
                </div>
            </div>
        </editor-sidebar-tab-item>

        <transition-fade>
            <div v-if="themeSelectOpen" class="grid grid-rows-subgrid row-span-2">
                <tab-theme-create
                    v-model="template"
                />

                <tab-theme-list
                    v-model="template"
                />
            </div>

            <div v-else class="grid grid-rows-subgrid row-span-2">
                <editor-sidebar-tab-item>
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
                </editor-sidebar-tab-item>

                <tab-theme-palette
                    v-model="currentTheme"
                    :theme-list="template.themes"
                    :disabled="hasDefaultThemeSelected"
                />
            </div>
        </transition-fade>
    </editor-sidebar-tab>
</template>