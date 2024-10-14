<script setup lang="ts">
    import { useNavigation } from "@/composables/useNavigation";
    import ArrowButton from "@/components/home/reusable/ArrowButton.vue";

    const {navigateTo} = useNavigation();
</script>

<template>
    <section class="flex gap-16">
        <h1 class="text-7xl text-nowrap pb-[0.25em] text-shadow">
            Free and accessible <br/>
            resume building
        </h1>

        <div class="grid gap-8 relative mt-5">
            <h2 class="text-xl">
                Create professional resumes effortlessly with an intuitive drag-and-drop interface, customizable templates, and real-time previews.
            </h2>

            <div class="flex gap-8 items-center text-nowrap">
                <arrow-button @click="navigateTo('/editor', {init: true})">Start now</arrow-button>
                <arrow-button @click="navigateTo('/templates')">Browse templates</arrow-button>
            </div>
        </div>
    </section>
</template>

<style lang="postcss" scoped>
    .text-shadow {
        text-shadow: 3px 3px rgb(var(--background));
    }
</style>