<script setup lang="ts">
    const model = defineModel({
        type: Boolean,
        required: true
    })
</script>

<template>
    <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" class="sr-only peer" v-model="model">
        <span class="relative w-11 h-6 bg-gray-200 dark:bg-gray-700 after:border-gray-300 dark:border-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></span>
    </label>
</template>