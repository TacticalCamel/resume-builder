<script setup lang="ts">
    import { onMounted } from "vue";
    import { useNavigation } from "@/composables/useNavigation";
    import { defaultThemes, applyTheme } from "@/functions/ThemeUtils.ts";
    import Home from "@/components/home/Home.vue";
    import Editor from "@/components/editor/Editor.vue";
    import Templates from "@/components/templates/Templates.vue";
    import RouteNotFound from "@/components/shared/RouteNotFound.vue";
    import Navigation from "@/components/shared/Navigation.vue";
    import TransitionFade from "@/components/shared/TransitionFade.vue";
    import NotificationArea from "@/components/shared/NotificationArea.vue";

    const {getActiveView} = useNavigation();

    const routes = {
        '/': Home,
        '/editor': Editor,
        '/templates': Templates
    };

    onMounted(() => {
        applyTheme(document.body, defaultThemes.dark);
    });
</script>

<template>
    <main class="relative min-h-full flex flex-col">
        <navigation/>

        <transition-fade>
            <component :is="getActiveView(routes) ?? RouteNotFound"/>
        </transition-fade>

        <notification-area/>
    </main>
</template>