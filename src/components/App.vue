<script setup lang="ts">
    import { computed, onMounted } from "vue";
    import { navigationService, themeService } from "@/main";
    import Home from "@/components/home/Home.vue";
    import Editor from "@/components/editor/Editor.vue";
    import Templates from "@/components/Templates.vue";
    import Navigation from "@/components/navigation/Navigation.vue";
    import NotFound from "@/components/NotFound.vue";

    // define the routes of the application
    const routes = {
        '/': Home,
        '/editor': Editor,
        '/templates': Templates
    };

    // the currently active view
    const currentView = computed(() => routes[navigationService.currentPath.value as keyof typeof routes] || NotFound);

    onMounted(() => {
        themeService.applyTheme(themeService.defaultDarkTheme);
    });
</script>

<template>
    <main class="relative min-h-full flex flex-col">
        <navigation/>

        <transition name="fade" mode="out-in">
            <component :is="currentView" :route-parameters="navigationService.parameters.value"/>
        </transition>
    </main>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: all 200ms ease-out;
    }

    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
</style>