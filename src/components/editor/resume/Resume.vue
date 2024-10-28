<script setup lang="ts">
    import { computed, provide } from "vue";
    import { editableInjectorKey } from "@/keys";
    import { getTheme } from "@/functions/Themes";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import ResumeBody from "@/components/editor/resume/ResumeBody.vue";

    const template = defineModel<ResumeTemplate>({
        required: true
    });

    const {editable = false} = defineProps<{
        editable?: boolean
    }>();

    provide(editableInjectorKey, editable);

    const styles = computed(() => ({
        filter: `grayscale(${template.value.filters.grayscale}%) contrast(${template.value.filters.contrast}%) brightness(${template.value.filters.brightness}%)`,
        backdropFilter: `grayscale(${template.value.filters.grayscale}%)`,
        fontFamily: template.value.currentFont,
        ...getTheme(template.value.currentTheme, template.value.themes).colors.reduce((previous, color) => ({...previous, [color.name]: color.value}), {})
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