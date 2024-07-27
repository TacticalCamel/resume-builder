<script setup lang="ts">
    import { computed } from "vue";
    import { navigationService } from "@/main";
    import Home from "@/components/home/Home.vue";
    import Editor from "@/components/routes/Editor.vue";
    import Templates from "@/components/routes/Templates.vue";
    import Navigation from "@/components/navigation/Navigation.vue";
    import NotFound from "@/components/routes/NotFound.vue";

    // define the routes of the application
    const routes = {
        '/': Home,
        '/editor': Editor,
        '/templates': Templates
    };

    // the currently active view
    const currentView = computed(() => routes[navigationService.currentPath.value as keyof typeof routes] || NotFound);
</script>

<template>
    <main class="relative min-h-full">
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