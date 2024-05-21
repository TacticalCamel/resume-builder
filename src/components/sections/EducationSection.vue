<script setup lang="ts">
    import type {EducationSection} from "@/models/sections/Education";

    defineProps<{
        model: EducationSection
    }>();
</script>

<template>
    <div>
        <div class="uppercase text-2xl">{{ model.title ?? 'Education' }}</div>
        <table class="m-2 me-0">
            <tbody>
                <tr v-for="edu in model.educations" :key="edu.school">
                    <td class="pe-8 mobile:pe-16 align-text-top text-nowrap">{{ edu.start }} - {{ edu.finish }}</td>
                    <td class="font-light pb-4">
                        <div>{{ edu.school }}</div>
                        <div class="opacity-60 font-light">{{ edu.major }}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>