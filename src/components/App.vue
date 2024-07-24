<script setup lang="ts">
    import { computed } from "vue";
    import { navigationService } from "@/main";
    import Home from "@/components/routes/Home.vue";
    import Editor from "@/components/routes/Editor.vue";
    import Navigation from "@/components/routes/Navigation.vue";
    import NotFound from "@/components/routes/NotFound.vue";

    // define the routes of the application
    const routes = {
        '/': Home,
        '/editor': Editor,
    };

    // the currently active view
    const currentView = computed(() => routes[navigationService.currentPath.value as keyof typeof routes] || NotFound);
</script>

<template>
    <main class="relative min-h-full">
        <navigation/>

        <div class="">
            <transition mode="out-in" appear>
                <component :is="currentView" :route-parameters="navigationService.parameters.value"/>
            </transition>
        </div>
    </main>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .v-enter-active, .v-leave-active {
        transition: all 300ms ease-in-out;
    }

    .v-enter-from, .v-leave-to {
        margin-right: 1rem;
        opacity: 0;
    }
</style>