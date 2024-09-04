<script setup lang="ts">
    import HeroSection from "@/components/home/sections/HeroSection.vue";
    import FeatureCard from "@/components/home/reusable/FeatureCard.vue";
</script>

<template>
    <div class=" gap-24">
        <hero-section class="mt-48"/>

        <section class="h-[720px] mt-24">
            <div class="size-full flex justify-center items-center border">
                <div class="text-5xl text-foreground/70 font-mono select-none">Placeholder for visual</div>
            </div>
        </section>

        <section class="flex justify-center gap-8">
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

        <footer class="border-t border-t-foreground/10">
            <section class="flex py-4">
                <div class="size-full flex justify-center items-center border h-24">
                    <div class="text-5xl text-foreground/70 font-mono select-none">Placeholder for footer</div>
                </div>
            </section>
        </footer>
    </div>
</template>

<style lang="postcss" scoped>
    section {
        @apply max-w-[1280px] px-5 mx-auto;
    }
</style>