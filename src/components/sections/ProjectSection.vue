<script setup lang="ts">
    import IconLink from "@/components/icons/IconLink.vue";
    import type {ProjectSection} from "@/models/sections/Project";

    defineProps<{
        model: ProjectSection
    }>();
</script>

<template>
    <div>
        <div class="uppercase text-2xl">{{ model.title }}</div>
        <div v-if="model.disclaimer" class="italic opacity-60 font-light mb-4 text-sm">{{ model.disclaimer }}</div>
        <div class="my-2 grid gap-6">
            <div v-for="project in model.projects" :key="project.description" class="flex">
                <div class="me-0.5">
                    <icon-link class="size-5 mt-0.5"/>
                </div>
                <div>
                    <div class="flex items-center flex-wrap">
                        <a :href="project.url" target="_blank" class="url-hover hover:transition-colors flex items-center underline me-2 mb-0.5">
                            <span class="text-nowrap">{{ project.url.replace(/^(https\:\/\/)/, "") }}</span>
                        </a>
                        <div class="grid grid-flow-col gap-2 auto-cols-min mb-0.5">
                            <span v-for="technology in project.technologies" class="px-1 technology-card rounded text-sm shadow-sm shadow-[#000000bb]">{{ technology }}</span>
                        </div>
                    </div>
                    <div class="font-light">
                        {{ project.description }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .technology-card{
        background-color: var(--accent-bg);
        color: var(--primary-light);
    }

    .url-hover:hover {
        color: var(--accent-text);
    }
</style>