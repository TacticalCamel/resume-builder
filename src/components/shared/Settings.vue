<script setup lang="ts">
    import {onMounted, ref} from "vue";
    import type {PropType} from "vue";
    import FileUpload from "@/components/shared/FileUpload.vue";
    import type PageModel from "@/models/PageModel";

    const model = defineModel({
        type: Object as PropType<PageModel>,
        required: true
    });

    onMounted(() => {
        // listen for the "t" key to toggle the modal
        window.addEventListener('keydown', (event) => {
            if (event.key === 't') {
                isOpen.value = !isOpen.value;
            }
        });
    });

    // whether the settings modal is open
    const isOpen = ref(false);

    // set the profile picture
    function setProfilePicture(contents: string){
        model.value.profilePicture = contents;
    }

    // set the template
    function setTemplate(contents: string){
        model.value.template = JSON.parse(contents);
    }
</script>

<template>
    <div class="w-screen h-screen bg-black bg-opacity-65 flex justify-center items-center absolute z-10 select-none text-white" :class="{hidden: !isOpen}">
        <div class="w-full m-4 mobile:m-0 mobile:w-auto bg-gray-800 p-8 rounded-2xl">
            <div class="flex items-center mb-5 pb-3 border-b border-gray-600 text-3xl">Settings</div>

            <div class="grid grid-cols-2 gap-6">
                <div>CV picture</div>
                <FileUpload @onSuccess="setProfilePicture" id="cv-image" accept="image/*" read-data-url>
                    Upload
                </FileUpload>

                <div>CV template</div>
                <FileUpload @onSuccess="setTemplate" id="cv-data" accept=".json">
                    Upload
                </FileUpload>

                <div>Dark mode</div>
                <div class="px-2">
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" class="sr-only peer" v-model="model.isDarkTheme">
                        <span
                            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-500"></span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>