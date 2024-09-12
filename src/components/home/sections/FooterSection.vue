<script setup lang="ts">
    import logo from '@/assets/logo.svg'
    import { useNavigationService } from "@/composables/NavigationService";

    const navigationService = useNavigationService();
</script>

<template>
    <footer class="border-t border-t-foreground/10 mt-24">
        <div class="px-5 py-12 grid w-fit gap-12 mx-auto max-w-[1280px]">
            <div class="grid grid-cols-3 gap-24">
                <div class="flex items-start gap-4">
                    <img :src="logo" alt="logo" class="size-10 -mt-2"/>
                    <div class="font-medium">Resume Builder</div>
                </div>
                <div class="flex flex-col items-start gap-1.5">
                    <div class="text-secondary font-medium mb-2">Pages</div>
                    <button @click="navigationService.navigateTo('/')">Home</button>
                    <button @click="navigationService.navigateTo('/editor')">Editor</button>
                    <button @click="navigationService.navigateTo('/templates')">Templates</button>
                </div>

                <div class="flex flex-col items-start gap-1.5">
                    <div class="text-secondary font-medium mb-2">Contact</div>
                    <a href="mailto:takacsbalazsg@gmail.com">Email</a>
                    <a href="https://github.com/TacticalCamel">Github</a>
                    <a href="https://github.com/TacticalCamel/resume-builder/issues">Issues</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<style lang="postcss" scoped>
    button, a {
        @apply font-light hover:underline;
    }
</style>