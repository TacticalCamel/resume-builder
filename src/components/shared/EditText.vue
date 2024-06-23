<script setup lang="ts">
    defineProps({
        editable: {
            type: Boolean,
            required: true
        }
    });

    const model = defineModel({
        type: String,
        required: true
    });
</script>

<template>
    <div v-if="!editable">{{ model }}</div>
    <input v-else type="text" :disabled="!editable" v-model="model" class="min-w-full bg-transparent outline-0" :class="editable ? 'outline-0 editable rounded' : ''" :size="model.length"/>
</template>

<style scoped>
    .editable{
        box-shadow: 0 0 0.2rem 0.1rem transparent;
        transition-property: box-shadow, background-color;
        transition-duration: 150ms;
    }

    .editable:hover:not(:focus){
        background-color: #f59e0b40;
    }

    .editable:focus{
        box-shadow: 0 0 0.2rem 0.1rem #f59e0b;
    }
</style>