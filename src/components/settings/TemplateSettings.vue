<script setup lang="ts">
    import FileUpload from "@/components/shared/FileUpload.vue";
    import type Template from "@/models/Template";
    import {onMounted, type PropType, watch} from "vue";

    // model for the template
    const template = defineModel('template', {
        type: Object as PropType<Template | null>,
        required: true
    })

    // model for the profile picture
    const profilePicture = defineModel('profilePicture', {
        type: String as PropType<string | null>,
        required: true
    })

    // handle model loading from local storage
    onMounted(() => {
        // load the profile picture from local storage
        const profilePictureValue: string | null = localStorage.getItem('profilePicture');

        if (profilePictureValue != null) {
            profilePicture.value = profilePictureValue;
        }

        // load the template from local storage
        const templateValue: string | null = localStorage.getItem('template');

        if (templateValue != null) {
            template.value = JSON.parse(templateValue);
        }
    });

    // watch for changes to the profile picture
    watch(profilePicture, (value) => {
        if (value) {
            localStorage.setItem('profilePicture', value);
        }
    });

    // watch for changes to the template
    watch(template, (value) => {
        if (value) {
            localStorage.setItem('template', JSON.stringify(value));
        }
    }, {deep: true});

    // set the profile picture
    function setProfilePicture(contents: string) {
        profilePicture.value = contents;
    }

    // set the template
    function setTemplate(contents: string) {
        template.value = JSON.parse(contents);
    }

    // download the template as a json file
    function downloadTemplate() {
        // get the json content
        const content = JSON.stringify(template.value, null, 4);

        // create a blob from the content
        const blob = new Blob([content], {type: 'application/json'});

        // create a url for the blob
        const url = URL.createObjectURL(blob);

        // create a link and click it to download the file
        const a = document.createElement('a');
        a.href = url;
        a.download = 'template.json';
        a.click();

        // revoke the url
        URL.revokeObjectURL(url);
    }
</script>

<template>
    <div class="grid grid-cols-2 gap-6">
        <div>Profile picture</div>
        <div class="flex flex-col text-sm">
            <file-upload @on-upload="setProfilePicture" id="cv-image" accept="image/*" read-data-url class="rounded font-semibold text-violet-500 hover:bg-violet-500 hover:bg-opacity-20 text-nowrap px-2 py-0.5 border border-violet-500 border-opacity-50 font-mono hover:transition-colors">
                Upload image
            </file-upload>
        </div>

        <div>Profile data</div>
        <div class="grid gap-3 text-sm">
            <file-upload @on-upload="setTemplate" id="cv-data" accept=".json" class="rounded font-semibold text-violet-500 hover:bg-violet-500 hover:bg-opacity-20 text-nowrap px-2 py-0.5 border border-violet-500 border-opacity-50 font-mono hover:transition-colors">
                Upload template
            </file-upload>
            <button @click="downloadTemplate" class="rounded font-semibold text-green-500 hover:bg-green-500 hover:bg-opacity-20 text-nowrap px-2 py-0.5 border border-green-500 border-opacity-50 font-mono hover:transition-colors text-center">
                Save template
            </button>
        </div>
    </div>
</template>