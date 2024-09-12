<script setup lang="ts">
    import { useThemeService } from "@/composables/ThemeService";
    import { ResumeModel } from "@/models/resume/Resume";
    import Resume from "@/components/editor/resume/Resume.vue";

    const themeService = useThemeService();

    const template = defineModel<ResumeModel>({
        required: true
    });

    const emit = defineEmits<{
        preview: [],
        edit: []
    }>();

    const scale = 2;

    const templateStyle = {
        height: `${scale * 100}%`,
        width: `${scale * 100}%`,
        transform: `scale(${1 / scale})`,
        ...themeService.defaultThemes.light.colors.reduce((previous, color) => ({...previous, [color.name]: color.value}), {})
    };

    function preview() {
        emit('preview');
    }

    function edit() {
        emit('edit');
    }
</script>

<template>
    <div class="grid gap-4">
        <div class="card relative w-[360px] h-[520px] border border-foreground/30 rounded shadow-lg shadow-black overflow-clip">
            <div class="relative origin-top-left pointer-events-none select-none p-4 bg-background text-foreground" :style="templateStyle">
                <resume v-model="template" class=""/>
            </div>

            <div class="absolute inset-0 p-4 actions opacity-0 transition-all flex flex-col justify-end">
                <div class="grid grid-cols-2 gap-2">
                    <button @click="edit()">Edit</button>
                    <button @click="preview()">Preview</button>
                </div>
            </div>
        </div>
        <div class="text-center">{{ template.header.profession }}</div>
    </div>
</template>

<style lang="postcss" scoped>
    .card:hover .actions {
        @apply opacity-100 bg-foreground/10;
    }

    button {
        @apply p-1 bg-background text-foreground/80 hover:text-foreground transition-colors rounded text-sm font-medium;
    }
</style>