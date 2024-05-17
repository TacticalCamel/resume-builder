<script setup lang="ts">
    import type Education from "@/data/Education";

    defineProps({
        education: {type: Array<Education>, required: true}
    });
</script>

<template>
    <div>
        <div class="uppercase text-2xl">Education</div>
        <table class="m-2 me-0">
            <tbody>
                <tr v-for="edu in education" :key="edu.school">
                    <td class="pe-8 mobile:pe-16 align-text-top text-nowrap">{{ edu.startDate }} - {{ edu.endDate }}</td>
                    <td class="font-light pb-4">
                        <div>{{ edu.school }}</div>
                        <div class="opacity-60 font-light">{{ edu.field }}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>