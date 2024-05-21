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
        if(value) {
            localStorage.setItem('profilePicture', value);
        }
    });

    // watch for changes to the template
    watch(template, (value) => {
        if(value) {
            localStorage.setItem('template', JSON.stringify(value));
        }
    });

    // set the profile picture
    function setProfilePicture(contents: string) {
        profilePicture.value = contents;
    }

    // set the template
    function setTemplate(contents: string) {
        template.value = JSON.parse(contents);
    }
</script>

<template>
    <div class="grid grid-cols-2 gap-6">
        <div>Profile picture</div>
        <FileUpload @on-upload="setProfilePicture" id="cv-image" accept="image/*" read-data-url>
            Upload
        </FileUpload>

        <div>Profile data</div>
        <FileUpload @on-upload="setTemplate" id="cv-data" accept=".json">
            Upload
        </FileUpload>
    </div>
</template>