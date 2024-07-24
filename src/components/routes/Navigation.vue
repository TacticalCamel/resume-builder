<script setup lang="ts">
    import { navigationService } from "@/main";
</script>

<template>
    <div class="sticky top-0 no-print z-10">
        <div class="max-w-[1280px] mx-auto px-4 pt-4 pb-3 flex items-center gap-12 border-b border-primary border-opacity-20 bg-background">
            <div class="text-3xl font-bold">CV Builder</div>
            <div class="flex items-center gap-2">
                <button @click="navigationService.navigateTo('/')" class="text-xl transition-colors bg-opacity-0 bg-accent hover:text-accent hover:bg-opacity-15 px-3 py-1 rounded">Home</button>
                <button @click="navigationService.navigateTo('/editor')" class="text-xl transition-colors bg-opacity-0 bg-accent hover:text-accent hover:bg-opacity-15 px-3 py-1 rounded">Editor</button>
                <button @click="navigationService.navigateTo('/templates')" class="text-xl transition-colors bg-opacity-0 bg-accent hover:text-accent hover:bg-opacity-15 px-3 py-1 rounded">Templates</button>
            </div>
        </div>
    </div>
</template>