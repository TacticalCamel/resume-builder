<script setup lang="ts">
    import { onMounted } from "vue";
    import { useNavigation } from "@/composables/Navigation";
    import { useThemes } from "@/composables/Themes";
    import Home from "@/components/home/Home.vue";
    import Editor from "@/components/editor/Editor.vue";
    import Templates from "@/components/templates/Templates.vue";
    import NotFound from "@/components/shared/NotFound.vue";
    import Navigation from "@/components/shared/navigation/Navigation.vue";
    import FadeTransition from "@/components/shared/transition/FadeTransition.vue";

    const {getActiveView, parameters} = useNavigation();
    const {applyTheme, defaultDarkTheme} = useThemes();

    const routes = {
        '/': Home,
        '/editor': Editor,
        '/templates': Templates
    };

    onMounted(() => {
        applyTheme(document.body, defaultDarkTheme);
    });
</script>

<template>
    <main class="relative min-h-full flex flex-col">
        <navigation/>

        <fade-transition>
            <component :is="getActiveView(routes) ?? NotFound" :route-parameters="parameters"/>
        </fade-transition>
    </main>
</template>