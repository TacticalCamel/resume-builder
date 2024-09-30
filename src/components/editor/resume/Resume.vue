<script setup lang="ts">
    import { computed } from "vue";
    import { useTemplate } from "@/composables/Template";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import ResumeBody from "@/components/editor/resume/ResumeBody.vue";

    const template = defineModel<ResumeTemplate>({
        required: true
    });

    const {currentTheme} = useTemplate(template);

    const {editable = false} = defineProps<{
        editable?: boolean
    }>();

    const styles = computed(() => ({
        filter: `grayscale(${template.value.filters.grayscale}%) contrast(${template.value.filters.contrast}%) brightness(${template.value.filters.brightness}%)`,
        backdropFilter: `grayscale(${template.value.filters.grayscale}%)`,
        fontFamily: template.value.currentFont,
        ...currentTheme.value.colors.reduce((previous, color) => ({...previous, [color.name]: color.value}), {})
    }));
</script>

<template>
    <div class="bg-background text-foreground py-10 px-3" :style="styles">
        <resume-body v-model="template.resume" :editable="editable"/>
    </div>
</template>