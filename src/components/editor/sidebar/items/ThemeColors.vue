<script setup lang="ts">
    import { isColorModified, resetColor } from "@/functions/Themes";
    import { Theme } from "@/models/style/Theme";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import ColorPicker from "@/components/editor/sidebar/reusable/ColorPicker.vue";

    const theme = defineModel<Theme>({
        required: true
    });

    const {themeList, disabled} = defineProps<{
        themeList: Theme[]
        disabled: boolean
    }>();
</script>

<template>
    <editor-tab-item>
        <div class="grid grid-cols-2 gap-2">
            <label class="col-span-2">Colors</label>

            <color-picker
                v-for="(color, index) in theme.colors"
                v-model="theme.colors[index]"
                class="px-2 py-0.5 rounded border-2 border-foreground/30"
                :key="color.name"
                :disabled="disabled"
                :modified="isColorModified(color, theme, themeList)"
                @reset="resetColor(color, theme, themeList)"
            />
        </div>
    </editor-tab-item>
</template>