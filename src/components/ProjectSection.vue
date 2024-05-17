<script setup lang="ts">
    import type Project from "@/data/Project";
    import IconLink from "@/components/icons/IconLink.vue";

    defineProps({
        projects: {type: Array<Project>, required: true},
        disclaimer: {type: String, required: false}
    });
</script>

<template>
    <div>
        <div class="uppercase text-2xl">Projects</div>
        <div v-if="disclaimer" class="italic opacity-60 font-light mb-2 text-sm">{{ disclaimer }}</div>
        <div class="my-2 grid gap-6">
            <div v-for="project in projects" :key="project.description" class="flex">
                <div class="me-0.5">
                    <IconLink class="size-5 mt-0.5"/>
                </div>
                <div>
                    <div class="flex items-center flex-wrap">
                        <a :href="project.url" target="_blank" class="hover:text-indigo-400 transition-colors flex items-center underline me-2 mb-0.5">
                            <span class="text-nowrap">{{ project.url.replace(/^(https\:\/\/)/, "") }}</span>
                        </a>
                        <div class="grid grid-flow-col gap-2 auto-cols-min mb-0.5">
                            <span v-for="technology in project.technologies" class="px-1 bg-indigo-500 rounded text-sm shadow-sm shadow-[#000000bb]">{{ technology }}</span>
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