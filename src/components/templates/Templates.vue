<script setup lang="ts">
    import { useTemplateService } from "@/composables/TemplateService";
    import TemplateCard from "@/components/templates/TemplateCard.vue";

    const templateService = useTemplateService();
</script>

<template>
    <div class="grid gap-16 mx-auto max-w-[1600px] p-8">
        <div class="grid gap-2">
            <h1 class="text-xl font-semibold">Custom templates</h1>
            <div class="flex flex-wrap gap-x-8 gap-y-6">
                <template-card v-for="(_, index) in templateService.templates" v-model="templateService.templates[index]"/>
            </div>
        </div>

        <div class="grid gap-2">
            <h1 class="text-xl font-semibold">Predefined templates</h1>
            <div class="flex flex-wrap gap-x-8 gap-y-6">
                <template-card v-for="(_, index) in templateService.templates" v-model="templateService.templates[index]"/>
            </div>
        </div>
    </div>
</template>