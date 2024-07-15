<script setup lang="ts">
    import { navigateTo } from "@/services/NavigationService";
</script>

<template>
    <div class="sticky top-0 no-print z-10">
        <div class="max-w-[1280px] mx-auto px-4 pt-4 pb-3 flex items-center gap-12 border-b border-primary border-opacity-20 bg-background">
            <div class="text-3xl font-bold">CV Editor</div>
            <div class="flex items-center gap-2">
                <button @click="navigateTo('/')" class="text-xl transition-colors bg-opacity-0 bg-accent hover:text-accent hover:bg-opacity-15 px-3 py-1 rounded">Home</button>
                <button @click="navigateTo('/editor')" class="text-xl transition-colors bg-opacity-0 bg-accent hover:text-accent hover:bg-opacity-15 px-3 py-1 rounded">Editor</button>
                <button @click="navigateTo('/templates')" class="text-xl transition-colors bg-opacity-0 bg-accent hover:text-accent hover:bg-opacity-15 px-3 py-1 rounded">Templates</button>
            </div>
        </div>
    </div>
</template>