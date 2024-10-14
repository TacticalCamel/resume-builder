<script setup lang="ts">
    import HeroSection from "@/components/home/sections/HeroSection.vue";
    import VisualSection from "@/components/home/sections/VisualSection.vue";
    import FooterSection from "@/components/home/sections/FooterSection.vue";
    import FeatureCard from "@/components/home/reusable/FeatureCard.vue";
</script>

<template>
    <div class="grow relative">
        <div class="absolute inset-0 scrollbar overflow-y-auto print:relative overflow-x-clip">
            <div class="background-graphic absolute top-12 -left-1/4 w-[150%] h-[1000px] -z-10"/>

            <div class="max-w-[1320px] grid gap-24 px-5 py-24 mx-auto mt-12">
                <hero-section/>
                <visual-section/>

                <section class="flex justify-center gap-8">
                    <feature-card title="Intuitive">
                        Drag and drop elements to create your resume. No coding or design skills required. Get started in minutes.
                    </feature-card>

                    <feature-card title="Customizable">
                        Choose from a variety of templates and customize them to your liking. Change colors, fonts, and layouts with ease.
                    </feature-card>

                    <feature-card title="Private">
                        We value your privacy and do not collect or store any personal data. All information is stored locally in your browser.
                    </feature-card>
                </section>

                <section class="border text-5xl font-mono h-96 flex items-center justify-center select-none">
                    <span>Features</span>
                </section>

                <section class="border text-5xl font-mono h-96 flex items-center justify-center select-none">
                    call to action
                </section>
            </div>

            <footer-section/>
        </div>
    </div>
</template>

<style scoped lang="postcss">
    .background-graphic {
        background: linear-gradient(0, rgb(var(--background)) 0%, rgb(var(--primary)) 25%, rgb(var(--error)) 40%, rebeccapurple 80%, rgb(var(--background)) 100%);
        animation: gradient 5s infinite ease-in-out;
        filter: blur(10px);
        transform: rotate(-8deg);
    }
</style>