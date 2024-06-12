<script setup lang="ts">
    import {onMounted, type PropType} from "vue";
    import type PageModel from "@/models/PageModel";
    import ThemeSettings from "@/components/settings/ThemeSettings.vue";
    import TemplateSettings from "@/components/settings/TemplateSettings.vue";

    // the page model containing all setting
    const model = defineModel({
        type: Object as PropType<PageModel>,
        required: true
    });

    onMounted(() => {
        window.addEventListener('keydown', (event) => {
            // toggle the settings modal with alt + t
            if (event.altKey && event.key === 't') {
                model.value.isEditMode = !model.value.isEditMode;
            }
        });
    });
</script>

<template>
    <transition name="appear">
        <div class="h-full absolute z-10 flex justify-center items-center select-none bg-[--primary-bg] me-[14px] border-e border-gray-500" v-show="model.isEditMode">
            <div class="m-4 mobile:m-0 px-12 grid gap-12">
                <div>
                    <div class="mb-5 pb-3 border-b border-gray-500 text-2xl">Theme settings</div>
                    <theme-settings v-model:dark-theme="model.isDarkTheme" v-model:colors="model.colors"/>
                </div>
                <div>
                    <div class="mb-5 pb-3 border-b border-gray-500 text-2xl">Template settings</div>
                    <template-settings v-model:template="model.template" v-model:profile-picture="model.profilePicture"/>
                </div>
            </div>
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