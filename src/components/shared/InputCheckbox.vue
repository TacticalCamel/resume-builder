<script setup lang="ts">
    const checked = defineModel<boolean>();
</script>

<template>
    <label class="select-none flex items-center gap-2">
        <input type="checkbox" v-model="checked" class="accent-primary size-[1.125em]"/>
        <slot/>
    </label>
</template>