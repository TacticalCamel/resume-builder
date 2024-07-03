<script setup lang="ts">
    import type ResumeModel from "@/models/ResumeModel";
    import {getExampleResume, getEmptyResume} from "@/models/ResumeModel";
    import type SettingsModel from "@/models/SettingsModel";

    const resume = defineModel<ResumeModel | null>('resume', {
        required: true
    });

    const settings = defineModel<SettingsModel>('settings', {
        required: true
    });

    function getStarted() {
        // create example resume
        resume.value = getExampleResume();

        // open settings panel
        settings.value.settingsOpen = true;

        // enable editing
        settings.value.editable = true;
    }

    function createEmpty() {
        resume.value = getEmptyResume();
    }
</script>

<template>
    <div class="">
        <div class="flex items-center justify-center gap-20 py-16">
            <div class="flex flex-col gap-8 items-start">
                <h1 class="text-7xl font-bold text-primary text-nowrap">Explain the value <br/> you provide</h1>
                <p class="text-xl">
                    Explain how you this value will be created, who is it for.
                    Easily create the perfect resume for any job using our best-in-class resume builder platform.
                </p>
                <p class="flex gap-4 items-center">
                    <button @click="getStarted" class="font-semibold text-background bg-primary hover:bg-opacity-60 px-6 py-2 rounded-full transition-colors">
                        Get started
                    </button>
                    <span>
                        Create an example resume and see how it works
                    </span>
                </p>
            </div>
            <div class="w-[48rem] h-[24rem] bg-accent flex items-center justify-center rounded-lg border-2 border-dashed border-primary">
                <span class="text-2xl italic font-semibold">TODO: Visual</span>
            </div>
        </div>

        <div class="p-8 max-w-[1280px] mx-auto bg-opacity-10 bg-primary rounded">
            <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt tincidunt. Nullam
            </div>
        </div>
    </div>
</template>