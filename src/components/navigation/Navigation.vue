<script setup lang="ts">
    import NavigationLink from "@/components/navigation/NavigationLink.vue";
    import NavigationTitle from "@/components/navigation/NavigationTitle.vue";
    import NavigationGroup from "@/components/navigation/NavigationGroup.vue";
</script>

<template>
    <div class="sticky z-10 top-0 backdrop-blur border-b border-b-foreground/10 no-print">
        <div class="mx-auto max-w-[1280px] px-4 flex items-center justify-between">
            <navigation-title>Resume Builder</navigation-title>

            <navigation-group>
                <navigation-link route="/">Home</navigation-link>
                <navigation-link route="/editor">Editor</navigation-link>
                <navigation-link route="/templates">Templates</navigation-link>
            </navigation-group>
        </div>
    </div>
</template>