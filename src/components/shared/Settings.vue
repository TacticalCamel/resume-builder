<script setup lang="ts">
    import {onMounted, ref} from "vue";
    import type {PropType} from "vue";
    import type Model from "@/models/Model";
    import FileUpload from "@/components/shared/FileUpload.vue";

    const isDarkTheme = defineModel('isDarkTheme', {
        type: Boolean,
        required: true
    });

    const image = defineModel('image', {
        type: String,
        required: true
    });
    
    const data = defineModel('data', {
        type: Object as PropType<Model>,
        required: true
    });

    // whether the settings modal is open
    const isOpen = ref(false);

    onMounted(() => {
        // listen for the "t" key to toggle the modal
        window.addEventListener('keydown', (event) => {
            if (event.key === 't') {
                isOpen.value = !isOpen.value;
            }
        });
    });

    function setImage(contents: string){
        image.value = contents;
    }

    function setData(contents: string){
        data.value = JSON.parse(contents);
    }
</script>

<template>
    <div class="w-screen h-screen bg-black bg-opacity-65 flex justify-center items-center absolute z-10 select-none text-white" :class="{hidden: !isOpen}">
        <div class="w-full m-4 mobile:m-0 mobile:w-auto bg-gray-800 p-8 rounded-2xl">
            <div class="flex items-center mb-5 pb-3 border-b border-gray-600 text-3xl">Settings</div>

            <div class="grid grid-cols-2 gap-6">
                <div>CV image</div>
                <FileUpload @onSuccess="setImage" id="cv-image" accept="image/*" read-src>
                    Upload
                </FileUpload>

                <div>CV data</div>
                <FileUpload @onSuccess="setData" id="cv-data" accept=".json">
                    Upload
                </FileUpload>

                <div>Dark mode</div>
                <div class="px-2">
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" class="sr-only peer" v-model="isDarkTheme">
                        <span
                            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-500"></span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>