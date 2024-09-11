<script setup lang="ts">
    import NavigationLink from "@/components/shared/navigation/NavigationLink.vue";
    import NavigationTitle from "@/components/shared/navigation/NavigationTitle.vue";
</script>

<template>
    <div class="sticky z-10 top-0 backdrop-blur border-b border-b-foreground/10 print:hidden bg-background/80">
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