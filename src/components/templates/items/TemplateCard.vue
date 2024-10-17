<script setup lang="ts">
    import { computed } from "vue";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import Resume from "@/components/editor/resume/Resume.vue";

    const {template, scale} = defineProps<{
        template: ResumeTemplate
        scale: number
    }>();

    defineEmits<{
        preview: [],
        edit: []
    }>();

    const templateModel = computed(() => {
        return template;
    })

    const templateStyle = computed(() => ({
        height: `${100 / scale}%`,
        width: `${100 / scale}%`,
        transform: `scale(${scale})`,
    }));
</script>

<template>
    <div class="grid gap-4">
        <div class="card relative border-2 border-foreground/30 rounded-lg shadow-lg shadow-black overflow-clip transition-colors hover:border-secondary">
            <resume
                v-model="templateModel"
                :style="templateStyle"
                class="relative origin-top-left pointer-events-none select-none p-4 bg-background text-foreground"
            />

            <div class="absolute inset-0 p-4 actions opacity-0 transition-all flex flex-col justify-end" @click="$emit('edit')">
                <div class="text-center text-secondary text-lg uppercase">Click to edit</div>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
    .card:hover {
        .actions {
            @apply opacity-100;
        }
    }

    button {
        @apply p-1 bg-background text-foreground/80 hover:text-foreground transition-colors rounded text-sm font-medium;
    }
</style>