<script setup lang="ts">
    import { useNavigationService } from "@/composables/NavigationService";
    import { useThemeService } from "@/composables/ThemeService";
    import { ResumeModel } from "@/models/resume/Resume";
    import Resume from "@/components/editor/resume/Resume.vue";

    const navigationService = useNavigationService();
    const themeService = useThemeService();

    const template = defineModel<ResumeModel>({
        required: true
    });

    const scale = 2;

    const templateStyle = {
        height: `${scale * 100}%`,
        width: `${scale * 100}%`,
        transform: `scale(${1 / scale})`,
        ...themeService.defaultThemes.light.colors.reduce((previous, color) => ({...previous, [color.name]: color.value}), {})
    };

    function preview() {

    }

    function edit() {
        navigationService.navigateTo('/editor', {load: template.value.id});
    }
</script>

<template>
    <div class="grid gap-4" ref="modal">
        <div class="card relative w-[340px] h-[480px] border border-foreground/30 rounded shadow-lg shadow-black overflow-clip">
            <div class="relative origin-top-left pointer-events-none select-none p-8 bg-background text-foreground" :style="templateStyle">
                <resume v-model="template" class="absolute top-0 left-0"/>
            </div>

            <div class="absolute inset-0 p-4 actions opacity-0 transition-all flex flex-col justify-end">
                <div class="grid grid-cols-2 gap-2">
                    <button @click="preview()">Preview</button>
                    <button @click="edit()">Edit</button>
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
        @apply p-1 bg-background border-2 border-foreground/30 hover:border-foreground text-foreground/80 hover:text-foreground transition-colors rounded text-sm font-medium;
    }
</style>