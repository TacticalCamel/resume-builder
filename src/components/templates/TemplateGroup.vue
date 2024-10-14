<script setup lang="ts">
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import TemplateCard from "@/components/templates/TemplateCard.vue";

    const {title, getTemplates} = defineProps<{
        title: string
        getTemplates: () => Promise<ResumeTemplate[]>
    }>();

    const templates: ResumeTemplate[] = await getTemplates();
</script>

<template>
    <div class="grid gap-2">
        <h1 class="text-2xl font-semibold">{{ title }}</h1>

        <div class="flex flex-wrap gap-x-8 gap-y-6">
            <template-card
                v-for="template in templates"
                :template="template"
                :scale="1"
            />
        </div>
    </div>
</template>

<style scoped lang="postcss">

</style>