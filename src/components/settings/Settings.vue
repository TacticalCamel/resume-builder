<script setup lang="ts">
    import {onMounted, type PropType, ref} from "vue";
    import type PageModel from "@/models/PageModel";
    import ThemeSettings from "@/components/settings/ThemeSettings.vue";
    import TemplateSettings from "@/components/settings/TemplateSettings.vue";

    // the page model containing all setting
    const model = defineModel({
        type: Object as PropType<PageModel>,
        required: true
    });

    // whether the settings modal is open
    const isOpen = ref(false);

    // listen for the "t" key to toggle the modal
    onMounted(() => {
        window.addEventListener('keydown', (event) => {
            if (event.key === 't') {
                isOpen.value = !isOpen.value;
            }
        });
    });
</script>

<template>
    <div class="w-screen h-screen bg-black bg-opacity-65 flex justify-center items-center absolute z-10 select-none" :class="{hidden: !isOpen}">
        <div class="w-full mobile:w-auto m-4 mobile:m-0 p-8 rounded-2xl grid gap-12 bg-[--primary-bg]">
            <div>
                <div class="mb-5 pb-3 border-b border-gray-500 text-2xl">Theme settings</div>
                <ThemeSettings v-model:dark-theme="model.isDarkTheme" v-model:colors="model.colors"/>
            </div>
            <div>
                <div class="mb-5 pb-3 border-b border-gray-500 text-2xl">Template settings</div>
                <TemplateSettings v-model:template="model.template" v-model:profile-picture="model.profilePicture"/>
            </div>
        </div>
    </div>
</template>