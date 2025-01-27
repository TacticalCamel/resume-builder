<script setup lang="ts">
    import { computed } from "vue";
    import { findThemeById } from "@/functions/ThemeUtils.ts";
    import { TemplateModel } from "@/models/Template";
    import ResumeBody from "@/components/editor/ResumeBody.vue";

    const template = defineModel<TemplateModel>({
        required: true
    });

    const styles = computed(() => ({
        filter: `grayscale(${template.value.filters.grayscale}%) contrast(${template.value.filters.contrast}%) brightness(${template.value.filters.brightness}%)`,
        backdropFilter: `grayscale(${template.value.filters.grayscale}%)`,
        fontFamily: template.value.currentFont,
        ...Object.entries(findThemeById(template.value.currentTheme, template.value.themes).colors).reduce((previous, [name, color]) => ({...previous, [name]: `${color.r} ${color.g} ${color.b}`}), {})
    }));
</script>

<template>
    <div class="bg-background text-foreground py-10 px-3" :style="styles" :id="template.id">
        <resume-body v-model="template.resume"/>
    </div>
</template>