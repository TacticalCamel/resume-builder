<script setup lang="ts">
    import { settings } from "@/main";
    import { navigationService } from "@/main";

    function getStarted() {
        // open settings panel
        settings.settingsOpen = true;

        // enable editing
        settings.editable = true;

        // navigate to the editor
        navigationService.navigateTo('/editor?init=true');
    }
</script>

<template>
    <div>
        <div class="flex items-center justify-start gap-20 max-w-[1280px] mx-auto mt-16 mb-48">
            <div class="grid gap-8 w-min relative py-8">
                <h1 class="text-6xl font-bold text-primary text-nowrap">Free and accessible resume <br/> building in your browser</h1>
                <p class="text-lg">
                    Create professional resumes effortlessly with an intuitive drag-and-drop interface, customizable templates, and real-time previews. No downloads or sign-ups required.
                </p>
                <p class="flex gap-4 items-center text-[15px]">
                    <button @click="getStarted" class="arrow-button font-semibold text-background bg-primary hover:bg-opacity-70 ps-6 pe-3 py-1.5 rounded-full flex items-center gap-1 transition-colors">
                        <span>Start now</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" class="size-5 mt-[1px]">
                            <path class="arrow-tip" d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
                            <path class="arrow-line" d="M200-440v-80h400v80H200Z"/>
                        </svg>
                    </button>
                    <span>
                        Create an example resume and see how it works
                    </span>
                </p>
                <div class="absolute top-0 -right-16 translate-x-full h-full w-[48rem] bg-info bg-opacity-20">
                    Visual
                </div>
            </div>
        </div>

        <div class="flex gap-8 max-w-[1280px] mx-auto my-8">
            <div v-for="() in 3" class="text-lg text-justify p-1 bg-gradient-to-br from-info to-accent rounded-lg bg-opacity-40">
                <div class="px-4 py-2 bg-background rounded">
                    <div class="font-bold">Feature card</div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .arrow-line, .arrow-tip {
        transition: all 150ms ease-in-out;
    }

    .arrow-button:hover .arrow-tip {
        transform: translateX(100px);
    }

    .arrow-button .arrow-line {
        opacity: 0;
    }

    .arrow-button:hover .arrow-line {
        opacity: 1;
    }
</style>