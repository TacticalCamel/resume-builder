<script setup lang="ts">
    import {inject} from "vue";
    import type SettingsModel from "@/models/SettingsModel";

    const settings = inject<SettingsModel>('settings', {} as SettingsModel);

    const model = defineModel({
        type: String,
        required: true
    });

    defineProps({
        placeholder: {
            type: String,
            required: false,
            default: '...'
        }
    })

    function saveModelChanges(e: Event) {
        model.value = (e.target as HTMLElement).innerText;
    }
</script>

<template>
    <div class="relative" :class="{'editable': settings.editable}">
        <div class="text-overlay size-full absolute pointer-events-none start-0 top-0 hidden text-center">{{ model.length ? undefined : placeholder }}</div>
        <div class="text-input" :contenteditable="settings.editable" @focusout="saveModelChanges">{{ model }}</div>
    </div>
</template>

<style scoped>
    .editable .text-input {
        border-radius: 0.25rem;
        position: relative;
        z-index: 1;
    }

    .editable .text-input:empty{
        min-width: 3ch;
    }

    .editable .text-input:focus {
        outline: 2px dashed #f59e0b;
    }

    .editable:not(:has(.text-input:focus)) .text-overlay {
        display: block;
        text-transform: none;
        opacity: 0.6;
    }

    .editable:hover .text-overlay:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        pointer-events: none;
        background: rgb(var(--primary));
        opacity: 0.33;
        border-radius: 0.25rem;
    }
</style>