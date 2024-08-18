<script setup lang="ts">
    import { settings } from "@/main";
    import { navigationService } from "@/main";
    import HeroSection from "@/components/home/HeroSection.vue";
    import ArrowButton from "@/components/home/ArrowButton.vue";
    import FeatureCard from "@/components/home/FeatureCard.vue";

    function getStarted() {
        // switch to the first tab
        settings.tabIndex = 0;

        // navigate to the editor
        navigationService.navigateTo('/editor', {init: true});
    }
</script>

<template>
    <div class="relative">
        <hero-section class="mt-48">
            <template #title>
                Free and accessible <br/>
                resume building
            </template>

            <template #subtitle>
                Create professional resumes effortlessly with an intuitive drag-and-drop interface, customizable templates, and real-time previews.
            </template>

            <template #actions>
                <arrow-button @click="getStarted">Start now</arrow-button>
                <arrow-button @click="navigationService.navigateTo('/templates')">Browse templates</arrow-button>
            </template>
        </hero-section>

        <section class="h-[720px] mt-24">
            <div class="size-full flex justify-center items-center border">
                <div class="text-5xl text-foreground/70 font-mono select-none">Placeholder for visual</div>
            </div>
        </section>

        <section class="mt-24 flex justify-center gap-8">
            <feature-card>
                <template #title>Intuitive</template>
                <template #content>
                    Drag and drop elements to create your resume. No coding or design skills required. Get started in minutes.
                </template>
            </feature-card>

            <feature-card>
                <template #title>Customizable</template>
                <template #content>
                    Choose from a variety of templates and customize them to your liking. Change colors, fonts, and layouts with ease.
                </template>
            </feature-card>

            <feature-card>
                <template #title>Private</template>
                <template #content>
                    We value your privacy and do not collect or store any personal data. All information is stored locally in your browser.
                </template>
            </feature-card>
        </section>

        <footer class="mt-24 border-t border-t-foreground/10">
            <section class="flex py-4">
                <div class="size-full flex justify-center items-center border h-24">
                    <div class="text-5xl text-foreground/70 font-mono select-none">Placeholder for footer</div>
                </div>
            </section>
        </footer>
    </div>
</template>

<style scoped>
    section {
        max-width: 1280px;
        padding-left: 20px;
        padding-right: 20px;
        margin-left: auto;
        margin-right: auto;
    }
</style>