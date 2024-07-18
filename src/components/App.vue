<script setup lang="ts">
    import { computed } from "vue";
    import { navigationService } from "@/main";
    import Resume from "@/components/Resume.vue";
    import Home from "@/components/Home.vue";
    import NotFound from "@/components/NotFound.vue";
    import Navigation from "@/components/Navigation.vue";

    // define the routes of the application
    const routes = {
        '/': Home,
        '/editor': Resume,
    };

    // the currently active view
    const currentView = computed(() => routes[navigationService.currentPath.value as keyof typeof routes] || NotFound);
</script>

<template>
    <main class="relative min-h-full">
        <navigation/>

        <div class="">
            <transition mode="out-in" appear>
                <component :is="currentView"/>
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