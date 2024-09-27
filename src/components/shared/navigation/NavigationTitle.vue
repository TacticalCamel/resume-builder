<script setup lang="ts">
    import { useNavigation } from "@/composables/Navigation";
    import logo from '@/assets/logo.svg'

    const navigationService = useNavigation();
</script>

<template>
    <div @click="navigationService.navigateTo('/')" class="flex items-center gap-4 cursor-pointer py-3">
        <img :src="logo" alt="logo" class="size-8"/>
        <div class="text-2xl text-nowrap font-medium">
            <slot/>
        </div>
    </div>
</template>