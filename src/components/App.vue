<script setup lang="ts">
    import { computed, onMounted } from "vue";
    import { navigationService, themeService } from "@/services";
    import Home from "@/components/home/Home.vue";
    import Editor from "@/components/editor/Editor.vue";
    import Templates from "@/components/templates/Templates.vue";
    import Navigation from "@/components/shared/navigation/Navigation.vue";
    import NotFound from "@/components/shared/NotFound.vue";

    // define the routes of the application
    const routes = {
        '/': Home,
        '/editor': Editor,
        '/templates': Templates
    };

    // the currently active view
    const currentView = computed(() => routes[navigationService.path as keyof typeof routes] || NotFound);

    onMounted(() => {
        themeService.applyTheme(document.body, themeService.defaultThemes.dark);
    });
</script>

<template>
    <main class="relative min-h-full flex flex-col">
        <navigation/>

        <transition name="fade" mode="out-in">
            <component :is="currentView" :route-parameters="navigationService.parameters"/>
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