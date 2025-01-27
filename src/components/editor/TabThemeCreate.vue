<script setup lang="ts">
    import { computed, reactive } from "vue";
    import { defaultThemes, findThemeById } from "@/functions/ThemeUtils.ts";
    import { TemplateModel } from "@/models/Template";
    import { Theme } from "@/models/Theme";
    import { ColorPalette } from "@/models/ColorPalette";
    import EditorSidebarTabItem from "@/components/editor/EditorSidebarTabItem.vue";

    const template = defineModel<TemplateModel>({
        required: true
    });

    const themeForm = reactive({
        name: undefined as (string | undefined),
        base: undefined as (string | undefined)
    });

    const availableThemes = computed<Theme[]>(() => {
        return [defaultThemes.light, defaultThemes.dark, ...template.value.themes];
    });

    function addThemeToTemplate(apply: boolean): void {
        // create theme
        const theme: Theme = createTheme();

        // add to the list of themes in the template
        template.value.themes.push(theme);

        // clear form
        themeForm.name = undefined;
        themeForm.base = undefined;

        if (apply) {
            // set current theme
            template.value.currentTheme = theme.id;

            // close form
        }
    }

    function createTheme(): Theme {
        const base: Theme = findThemeById(themeForm.base, template.value.themes);
        const colors: ColorPalette = structuredClone(base.colors);

        return {
            id: crypto.randomUUID(),
            name: themeForm.name,
            base: base.id,
            colors: colors
        };
    }
</script>

<template>
    <editor-sidebar-tab-item title="create new theme">
        <div class="grid gap-4">
            <div class="grid grid-cols-2 items-center gap-2 text-nowrap font-light">
                <label>Name</label>
                <input
                    type="text"
                    v-model="themeForm.name"
                    class="bg-transparent rounded outline outline-1 outline-foreground/30 py-0.5 px-2 disabled:text-foreground/50 disabled:cursor-not-allowed focus:outline-foreground"
                />

                <label>Default color values</label>
                <select v-model="themeForm.base" class="bg-background rounded outline outline-1 outline-foreground/30 py-0.5 px-1 h-6 opacity-100 disabled:text-foreground/50 disabled:cursor-not-allowed focus:outline-foreground">
                    <option :value="undefined">
                        None
                    </option>

                    <option v-for="theme in availableThemes" :value="theme.id">
                        {{ theme.name }}
                    </option>
                </select>
            </div>

            <div class="grid grid-cols-2 gap-2 font-medium">
                <button @click="addThemeToTemplate(false)" class="flex justify-center items-center gap-2 p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors">Create</button>
                <button @click="addThemeToTemplate(true)" class="flex justify-center items-center gap-2 p-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors">Create and apply</button>
            </div>
        </div>
    </editor-sidebar-tab-item>
</template>

<style scoped lang="postcss">

</style>