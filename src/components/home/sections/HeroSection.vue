<script setup lang="ts">
    import ArrowButton from "@/components/home/reusable/ArrowButton.vue";
    import { navigationService } from "@/services/services";
</script>

<template>
    <section class="flex gap-16">
        <h1 class="text-7xl text-nowrap pb-[0.25em]">
            Free and accessible <br/>
            resume building
        </h1>

        <div class="grid gap-8 relative mt-5">
            <h2 class="text-xl text-foreground/70">
                Create professional resumes effortlessly with an intuitive drag-and-drop interface, customizable templates, and real-time previews.
            </h2>

            <div class="flex gap-8 items-center text-nowrap">
                <arrow-button @click="navigationService.navigateTo('/editor', {init: true})">Start now</arrow-button>
                <arrow-button @click="navigationService.navigateTo('/templates')">Browse templates</arrow-button>
            </div>
        </div>
    </section>
</template>