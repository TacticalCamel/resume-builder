<script setup lang="ts">
    import { TemplateModel } from "@/models/Template";

    const {template, active = false} = defineProps<{
        template: TemplateModel
        active?: boolean
    }>();
</script>

<template>
    <a :href="'#' + template.id" class="text-[15px] px-2 py-1 flex gap-2 items-center transition-colors hover:text-foreground focus:text-foreground" :class="active ? 'text-foreground' : 'text-foreground/70'">
        <span v-if="template.resume.header.name.length" class="capitalize">{{ template.resume.header.name }}</span>
        <span v-else class="italic">Unnamed</span>

        <span>-</span>

        <span v-if="template.resume.header.profession.length" class="capitalize">{{ template.resume.header.profession }}</span>
        <span v-else class="italic">No profession</span>
    </a>
</template>