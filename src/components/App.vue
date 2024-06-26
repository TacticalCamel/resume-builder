<script setup lang="ts">
    import Settings from "@/components/settings/Settings.vue";
    import Resume from "@/components/Resume.vue";
    import {provide, ref} from "vue";
    import type PageModel from "@/models/PageModel";
    import {createPageModel} from "@/models/PageModel";
    import StartPage from "@/components/StartPage.vue";

    // define a model containing all the information on the page
    const model = ref<PageModel>(createPageModel());

    const isEditMode = ref<boolean>(true);

    provide('isEditMode', isEditMode);
</script>

<template>
    <main class="h-screen w-screen overflow-x-hidden" :class="model.isDarkTheme ? 'theme-dark' : 'theme-light'">
        <resume v-if="model.template" v-model="model.template"/>
        <start-page v-else v-model="model"/>

        <settings v-model:model="model" v-model:is-edit-mode="isEditMode"/>
    </main>
</template>

<style scoped>
    main {
        background-color: var(--primary-bg);
        color: var(--primary-text);
    }

    main::-webkit-scrollbar {
        width: 14px;
    }

    main::-webkit-scrollbar-thumb {
        background-color: var(--primary-text);
        border-radius: 9999px;
        border: 4px solid var(--primary-bg);
    }

    main::-webkit-scrollbar-track {
        background-color: var(--primary-bg);
    }
</style>