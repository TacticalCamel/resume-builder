<script setup lang="ts">
    import type Language from "@/data/Language";

    defineProps({
        languages: {type: Array<Language>, required: true}
    });
</script>

<template>
    <div>
        <div class="uppercase text-2xl">Languages</div>
        <table class="m-2 me-0">
            <tbody>
                <tr v-for="language in languages" :key="language.name">
                    <td class="inline-block p-0 pb-0.5 pe-16">{{ language.name }}</td>
                    <td class="font-light p-0 pb-0.5">{{ language.level }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>