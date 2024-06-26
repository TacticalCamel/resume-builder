<script setup lang="ts">
    import {onMounted, type PropType} from "vue";
    import type PageModel from "@/models/PageModel";
    import ThemeSettings from "@/components/settings/ThemeSettings.vue";
    import TemplateSettings from "@/components/settings/TemplateSettings.vue";
    import IconDoubleArrowLeft from "@/components/icons/IconDoubleArrowLeft.vue";

    // the page model containing all setting
    const model = defineModel('model', {
        type: Object as PropType<PageModel>,
        required: true
    });

    const isEditMode = defineModel('isEditMode', {
        type: Boolean,
        required: true
    });

    // toggle settings on 'Alt + C'
    onMounted(() => {
        window.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 'c') {
                toggleSettings();
            }
        });
    });

    // toggle the settings panel
    function toggleSettings() {
        model.value.isSettingsOpen = !model.value.isSettingsOpen;
    }
</script>

<template>
    <transition name="appear">
        <div class="h-full w-full absolute top-0 left-0 z-10 flex justify-center items-center select-none bg-[--primary-bg] sm:border-e sm:border-gray-500 sm:w-auto" v-show="model.isSettingsOpen">
            <div class="m-4 mobile:m-0 px-12 grid gap-12">
                <div>
                    <div class="mb-5 pb-3 border-b border-gray-500 text-2xl">Theme settings</div>
                    <theme-settings v-model:dark-theme="model.isDarkTheme" v-model:colors="model.colors"/>
                </div>
                <div>
                    <div class="mb-5 pb-3 border-b border-gray-500 text-2xl">Template settings</div>
                    <template-settings v-model:is-edit-mode="isEditMode" v-model:template="model.template"/>
                </div>
            </div>

            <button @click="toggleSettings" class="absolute top-0 end-0 rounded-full p-2 m-2 hover:text-red-500 hover:bg-opacity-20 hover:bg-red-500 transition-colors">
                <icon-double-arrow-left class="size-8"/>
            </button>
        </div>
    </transition>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .appear-enter-active, .appear-leave-active {
        transition: transform 0.1s ease-in-out;
    }

    .appear-enter-from, .appear-leave-to {
        transform: translate(-100%, 0);
    }
</style>