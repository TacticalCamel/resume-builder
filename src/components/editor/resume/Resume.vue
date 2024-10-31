<script setup lang="ts">
    import { computed } from "vue";
    import { findThemeById } from "@/functions/Themes";
    import { TemplateModel } from "@/models/Template";
    import ResumeBody from "@/components/editor/resume/ResumeBody.vue";

    const template = defineModel<TemplateModel>({
        required: true
    });

    const styles = computed(() => ({
        filter: `grayscale(${template.value.filters.grayscale}%) contrast(${template.value.filters.contrast}%) brightness(${template.value.filters.brightness}%)`,
        backdropFilter: `grayscale(${template.value.filters.grayscale}%)`,
        fontFamily: template.value.currentFont,
        ...findThemeById(template.value.currentTheme, template.value.themes).colors.reduce((previous, color) => ({...previous, [color.name]: `${color.value.r} ${color.value.g} ${color.value.b}`}), {})
    }));

    const styleSheet = computed<CSSStyleSheet>(() => {
        const sheet: CSSStyleSheet = new CSSStyleSheet();

        for(const style of template.value.styles) {
            const selector: string = style.selectors.map(selector => `#${template.value.id} ${selector}`).join(',');
            const styles: string = Object.entries(style.styles).map(entry => `${entry[0]}: ${entry[1]}`).join(';');

            sheet.insertRule(`${selector}{${styles}}`);
        }

        console.log(sheet);

        return sheet;
    });
</script>

<template>
    <div class="bg-background text-foreground py-10 px-3" :style="styles" :id="template.id">
        <resume-body v-model="template.resume"/>
    </div>
</template>