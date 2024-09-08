<script setup lang="ts">
    import TemplateCard from "@/components/templates/TemplateCard.vue";
</script>

<template>
    <div class="mx-auto max-w-[1600px] p-8 flex flex-wrap gap-8">
        <template-card v-for="() in 23"/>
    </div>
</template>

<style lang="postcss" scoped>

</style>