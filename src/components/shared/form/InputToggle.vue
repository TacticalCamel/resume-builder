<script setup lang="ts">
    const model = defineModel<boolean>();

    const {disabled = false, checked = false} = defineProps<{
        disabled?: boolean
        checked?: boolean
    }>();
</script>

<template>
    <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" class="sr-only peer" v-if="disabled" :checked="checked" disabled/>
        <input type="checkbox" class="sr-only peer" v-else v-model="model">

        <span class="input-toggle peer-checked:after:translate-x-full bg-foreground/30 peer-checked:bg-primary peer-disabled:bg-foreground/20 peer-disabled:peer-checked:bg-primary/65"/>
    </label>
</template>

<style lang="postcss" scoped>
    .input-toggle {
        @apply relative rounded-full transition-colors;

        height: 1lh;
        width: calc(2lh - 0.25rem);

        &::after {
            @apply content-[''] absolute top-0.5 left-0.5 rounded-full bg-white transition-transform;

            height: calc(1lh - 0.25rem);
            width: calc(1lh - 0.25rem);
        }
    }
</style>