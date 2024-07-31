<script setup lang="ts">
    const model = defineModel<boolean>({
        required: true
    });

    defineProps({
        label: {
            type: String,
            required: false,
            default: ''
        }
    });
</script>

<template>
    <label class="select-none flex items-center gap-2">
        <input type="checkbox" v-model="model" class="accent-primary size-[1.125em]"/>
        <span>{{ label }}</span>
    </label>
</template>