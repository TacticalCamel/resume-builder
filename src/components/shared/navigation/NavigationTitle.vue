<script setup lang="ts">
    import { navigationService } from "@/services/services";
    import logo from '@/assets/logo.svg'
</script>

<template>
    <div @click="navigationService.navigateTo('/')" class="flex items-center gap-4 cursor-pointer py-3">
        <img :src="logo" alt="logo" class="size-8"/>
        <div class="text-2xl text-nowrap font-medium">
            <slot/>
        </div>
    </div>
</template>