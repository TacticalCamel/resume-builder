<script setup lang="ts">
    import type {SkillCategory} from "@/data/Skills";
    import RatingBar from "@/components/RatingBar.vue";

    defineProps({
        skills: {type: Array<SkillCategory>, required: true}
    });
</script>

<template>
    <div class="text-nowrap">
        <div class="uppercase text-2xl">Skills</div>
        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 m-2 me-0">
            <section v-for="category in skills" :key="category.name" class="flex flex-col items-start size-min">
                <div class="text-lg pb-0.5">{{ category.name }}</div>
                <div v-for="skill in category.skills" :key="skill.name" class="flex py-0.5 items-center">
                    <div class="ps-0.5 pe-3">
                         <rating-bar :value="skill.level"/>
                    </div>
                    <span class="font-light">{{ skill.name }}</span>
                </div>
            </section>
        </div>
    </div>
</template>