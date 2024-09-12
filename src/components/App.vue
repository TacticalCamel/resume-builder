<script setup lang="ts">
    import { computed, onMounted } from "vue";
    import { useThemeService } from "@/composables/ThemeService";
    import { useNavigationService } from "@/composables/NavigationService";
    import Home from "@/components/home/Home.vue";
    import Editor from "@/components/editor/Editor.vue";
    import Templates from "@/components/templates/Templates.vue";
    import Navigation from "@/components/shared/navigation/Navigation.vue";
    import NotFound from "@/components/shared/NotFound.vue";
    import FadeTransition from "@/components/shared/FadeTransition.vue";

    // define the routes of the application
    const routes = {
        '/': Home,
        '/editor': Editor,
        '/templates': Templates
    };

    const navigationService = useNavigationService();
    const themeService = useThemeService();

    // the currently active view
    const currentView = computed(() => routes[navigationService.path as keyof typeof routes] || NotFound);

    onMounted(() => {
        themeService.applyTheme(document.body, themeService.defaultThemes.dark);
    });
</script>

<template>
    <main class="relative min-h-full flex flex-col">
        <navigation/>

        <fade-transition>
            <component :is="currentView" :route-parameters="navigationService.parameters"/>
        </fade-transition>
    </main>
</template>