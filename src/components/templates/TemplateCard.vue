<script setup lang="ts">
    import { computed } from "vue";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import Resume from "@/components/editor/resume/Resume.vue";

    const {template} = defineProps<{
        template: ResumeTemplate
    }>();

    const computedTemplate = computed(() => {
        return template;
    })

    const emit = defineEmits<{
        preview: [],
        edit: []
    }>();

    const scale = 2;

    const templateStyle = {
        height: `${scale * 100}%`,
        width: `${scale * 100}%`,
        transform: `scale(${1 / scale})`,
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
            <resume
                v-model="computedTemplate"
                :style="templateStyle"
                class="relative origin-top-left pointer-events-none select-none p-4 bg-background text-foreground"
            />

            <div class="absolute inset-0 p-4 actions opacity-0 transition-all flex flex-col justify-end">
                <div class="grid grid-cols-2 gap-2">
                    <button @click="edit()">Edit</button>
                    <button @click="preview()">Preview</button>
                </div>
            </div>
        </div>
        <div class="text-center">{{ computedTemplate.resume.header.profession }}</div>
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