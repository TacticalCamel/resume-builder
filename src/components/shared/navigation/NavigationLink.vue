<script setup lang="ts">
    import { computed } from "vue";
    import { useNavigation } from "@/composables/Navigation";

    const {navigateTo, path} = useNavigation();

    const {route} = defineProps<{
        route: string
    }>();

    const active = computed(() => path.value === route);
</script>

<template>
    <button @click="navigateTo(route)" class="nav-link relative items-center px-6 py-3 mt-2 cursor-pointer hover:text-primary transition-colors border-b -mb-px select-none" :class="active ? 'border-b-primary': 'border-b-transparent'">
        <span class="text-nowrap font-semibold">
            <slot/>
        </span>
    </button>
</template>