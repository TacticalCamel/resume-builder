<script setup lang="ts">
    import { onMounted } from "vue";
    import { useNavigation } from "@/composables/useNavigation";
    import { defaultThemes, applyTheme } from "@/functions/Themes";
    import Home from "@/components/home/Home.vue";
    import Editor from "@/components/editor/Editor.vue";
    import Templates from "@/components/templates/Templates.vue";
    import NotFound from "@/components/shared/NotFound.vue";
    import Navigation from "@/components/shared/navigation/Navigation.vue";
    import FadeTransition from "@/components/shared/transition/FadeTransition.vue";
    import NotificationArea from "@/components/shared/notifications/NotificationArea.vue";

    const {getActiveView, parameters} = useNavigation();

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

        <fade-transition>
            <component :is="getActiveView(routes) ?? NotFound" :route-parameters="parameters"/>
        </fade-transition>

        <notification-area/>
    </main>
</template>