<script setup lang="ts">
    import {createExampleTemplate} from "@/models/Template";
    import type PageModel from "@/models/PageModel";
    import type {PropType} from "vue";

    const model = defineModel({
        type: Object as PropType<PageModel>,
        required: true
    })

    function createExample() {
        model.value.template = createExampleTemplate();
    }

    // toggle settings
    function toggleSettings() {
        model.value.isSettingsOpen = !model.value.isSettingsOpen;
    }
</script>

<template>
    <div class="h-screen text-2xl flex justify-center items-center font-mono">
        <div class="grid gap-6 text-center select-none">
            <button @click="createExample" class="rounded font-semibold text-green-500 hover:bg-green-500 hover:bg-opacity-20 text-nowrap px-4 py-1 border border-green-500 border-opacity-50 font-mono hover:transition-colors text-center">
                Create an example template
            </button>
            <button @click="toggleSettings" class="rounded font-semibold text-amber-500 hover:bg-amber-500 hover:bg-opacity-20 text-nowrap px-4 py-1 border border-amber-500 border-opacity-50 font-mono hover:transition-colors text-center">
                Press 'Alt + C' to toggle settings
            </button>
        </div>
    </div>
</template>

<style scoped>

</style>