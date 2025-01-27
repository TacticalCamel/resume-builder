<script setup lang="ts">
    const model = defineModel<boolean>();

    const {disabled = false, checked = false} = defineProps<{
        disabled?: boolean
        checked?: boolean
    }>();
</script>

<template>
    <label class="select-none flex items-center gap-2">
        <input v-if="disabled" type="checkbox" class="accent-primary size-[1.125em]" :checked="checked" disabled>
        <input v-else type="checkbox" v-model="model" class="accent-primary size-[1.125em]"/>
        <slot/>
    </label>
</template>