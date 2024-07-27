<script setup lang="ts">
    import NavigationLink from "@/components/navigation/NavigationLink.vue";
    import NavigationTitle from "@/components/navigation/NavigationTitle.vue";
    import NavigationGroup from "@/components/navigation/NavigationGroup.vue";
    import IconHome from "@/components/icons/IconHome.vue";
    import IconEdit from "@/components/icons/IconEdit.vue";
    import IconDashboard from "@/components/icons/IconDashboard.vue";
</script>

<template>
    <header class="sticky z-10 top-0 backdrop-blur border-b border-b-foreground/10">
        <div class="navigation mx-auto max-w-[1280px] px-4 flex items-center justify-between">
            <navigation-title>Resume Builder</navigation-title>

            <navigation-group>
                <navigation-link route="/" :icon="IconHome">Home</navigation-link>
                <navigation-link route="/editor" :icon="IconEdit">Editor</navigation-link>
                <navigation-link route="/templates" :icon="IconDashboard">Templates</navigation-link>
            </navigation-group>
        </div>
    </header>
</template>