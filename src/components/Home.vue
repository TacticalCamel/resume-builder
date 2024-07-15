<script setup lang="ts">
    import IconChevronRight from "@/components/icons/IconChevronRight.vue";
    import { settings } from "@/main";
    import { navigateTo } from "@/services/NavigationService";

    function getStarted() {
        // open settings panel
        settings.settingsOpen = true;

        // enable editing
        settings.editable = true;

        navigateTo('/editor');
    }
</script>

<template>
    <div>
        <div class="flex items-center justify-start gap-20 py-8 max-w-[1280px] mx-auto">
            <div class="grid gap-8 w-min relative py-8">
                <h1 class="text-6xl font-bold text-primary text-nowrap">Free and accessible resume <br/> building in your browser</h1>
                <p class="text-xl">
                    Explain how you this value will be created, who is it for.
                    Easily create the perfect resume for any job using our best-in-class resume builder platform.
                </p>
                <p class="flex gap-4 items-center">
                    <button @click="getStarted" class="font-semibold text-background bg-primary hover:bg-opacity-70 ps-6 pe-3 py-2 rounded-full flex items-center gap-1 transition-colors">
                        <span>Get started</span>
                        <icon-chevron-right class="size-6"/>
                    </button>
                    <span>
                        Create an example resume and see how it works
                    </span>
                </p>
                <div class="absolute top-0 right-0 translate-x-full h-full ps-16 w-[48rem]">
                    <div class="text-2xl italic font-semibold bg-red-300 h-full border-2 border-dashed border-primary rounded-lg text-center">TODO: Visual</div>
                </div>
            </div>
        </div>

        <div class="p-8 max-w-[1280px] mx-auto bg-opacity-10 bg-primary rounded-lg">
            <div class="text-lg text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
        </div>
    </div>
</template>