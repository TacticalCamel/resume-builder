<script setup lang="ts">
    import NavigationLink from "@/components/shared/NavigationLink.vue";
    import NavigationTitle from "@/components/shared/NavigationTitle.vue";
</script>

<template>
    <div class="sticky z-10 top-0 border-b border-b-foreground/10 print:hidden">
        <div class="mx-auto max-w-[1280px] px-4 flex items-center justify-between">
            <navigation-title>
                Resume Builder
            </navigation-title>

            <div class="flex gap-4">
                <navigation-link route="/">Home</navigation-link>
                <navigation-link route="/editor">Editor</navigation-link>
                <navigation-link route="/templates">Templates</navigation-link>
            </div>
        </div>
    </div>
</template>