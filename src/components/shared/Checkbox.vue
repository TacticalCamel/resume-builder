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
    <div class="flex items-center gap-2">
        <input type="checkbox" :id="`checkbox-${$.uid}`" v-model="model" class="accent-accent size-[1.125em]"/>
        <label :for="`checkbox-${$.uid}`" class="select-none">{{ label }}</label>
    </div>
</template>

<style scoped>

</style>