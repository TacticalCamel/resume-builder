<script setup lang="ts">
    const model = defineModel<boolean>();

    defineProps({
        disabled: {
            type: Boolean,
            default: false
        },
        checked: {
            type: Boolean,
            default: false
        }
    });
</script>

<template>
    <label class="inline-flex items-center cursor-pointer">
        <input v-if="disabled" type="checkbox" class="sr-only peer" :checked="checked" disabled/>
        <input v-else type="checkbox" class="sr-only peer" v-model="model">

        <span class="peer peer-checked:after:translate-x-full bg-foreground peer-checked:bg-primary bg-opacity-30 peer-checked:bg-opacity-100 peer-disabled:bg-opacity-20 peer-disabled:peer-checked:bg-opacity-65"></span>
    </label>
</template>

<style scoped>
    span {
        position: relative;
        height: 1lh;
        width: calc(2lh - 0.25rem);
        border-radius: 9999px;
        transition: background-color 150ms ease-in-out;
    }

    span::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        height: calc(1lh - 0.25rem);
        width: calc(1lh - 0.25rem);
        border-radius: 9999px;
        background-color: white;
        transition: transform 150ms ease-in-out;
    }
</style>