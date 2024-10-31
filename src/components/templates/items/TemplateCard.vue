<script setup lang="ts">
    import { computed, onMounted, useTemplateRef } from "vue";
    import { applyTheme, findThemeById } from "@/functions/Themes";
    import { TemplateModel } from "@/models/Template";
    import Resume from "@/components/editor/resume/Resume.vue";

    const {template, scale} = defineProps<{
        template: TemplateModel
        scale: number
    }>();

    defineEmits<{
        preview: [],
        edit: []
    }>();

    const templateModel = computed(() => {
        return template;
    });

    const templateStyle = computed(() => ({
        height: `${100 / scale}%`,
        width: `${100 / scale}%`,
        transform: `scale(${scale})`,
    }));

    const card = useTemplateRef('card');

    onMounted(() => {
        applyTheme(card.value as HTMLElement, findThemeById(template.currentTheme, template.themes));
    });
</script>

<template>
    <div ref="card" class="group bg-background text-foreground relative border-2 border-foreground/30 rounded-lg shadow-lg shadow-black transition-colors hover:border-secondary overflow-clip" @click="$emit('edit')">
        <resume
            v-model="templateModel"
            :style="templateStyle"
            class="relative origin-top-left pointer-events-none select-none p-4 bg-background text-foreground overflow-clip"
        />

        <div class="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-all bg-background pointer-events-none">
            <div class="text-center text-secondary text-lg border-t-2 border-foreground/30 p-2">Click to preview and edit</div>
        </div>
    </div>
</template>