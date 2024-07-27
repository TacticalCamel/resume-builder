<script setup lang="ts">
    import { computed, Component as ComponentType } from "vue";
    import { navigationService } from "@/main";

    const props = defineProps<{
        route: string
        icon: ComponentType
    }>();

    const active = computed(() => navigationService.currentPath.value === props.route);
</script>

<template>
    <button @click="navigationService.navigateTo(route)" class="nav-link relative items-center px-6 py-3 mt-2 cursor-pointer hover:text-primary transition-colors border-b -mb-px select-none" :class="active ? 'border-b-primary': 'border-b-transparent'">
        <span class="text-nowrap font-semibold">
            <slot/>
        </span>
    </button>
</template>