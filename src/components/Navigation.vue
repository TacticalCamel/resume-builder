<script setup lang="ts">
    import type SettingsModel from "@/models/SettingsModel";
    import IconSettings from "@/components/icons/IconSettings.vue";

    const settings = defineModel<SettingsModel>('settings', {
        required: true
    });
</script>

<template>
    <div class="sticky top-0 flex items-center justify-start p-2 no-print z-10 bg-background border-b border-primary border-opacity-20 ms-4 me-0.5 select-none">
        <div class="text-3xl uppercase font-semibold px-4">cv editor</div>
        <button @click="settings.settingsOpen = !settings.settingsOpen" class="py-1 px-4 ms-auto rounded hover:text-accent">
            <icon-settings class="size-8 setting-icon" :class="{'open': settings.settingsOpen}"/>
        </button>
    </div>
</template>

<style scoped>
    .setting-icon {
        transition: all 300ms;
    }

    .setting-icon.open{
        transform: rotate(180deg);
        color: rgb(var(--accent));
    }
</style>