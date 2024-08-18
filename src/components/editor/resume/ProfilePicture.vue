<script setup lang="ts">
    import { inject } from "vue";
    import IconProfile from "@/components/icons/IconProfile.vue";
    import InputFile from "@/components/shared/InputFile.vue";
    import IconDelete from "@/components/icons/IconDelete.vue";
    import IconUploadFile from "@/components/icons/IconUploadFile.vue";

    const picture = defineModel<string | null>({
        required: true
    });

    // set the profile picture
    function setProfilePicture(contents: string | ArrayBuffer) {
        if(typeof contents !== 'string') {
            return;
        }

        picture.value = contents;
    }

    // remove the profile picture
    function removeProfilePicture() {
        picture.value = null;
    }

    const editable = inject<boolean>('editable', false);
</script>

<template>
    <div class="rounded-full select-none shadow shadow-black relative overflow-clip">
        <img v-if="picture" :src="picture" alt="profile picture" class="absolute size-full rounded-full">
        <icon-profile v-else class="absolute size-full p-4"/>

        <div v-if="editable" class="absolute size-full flex flex-col justify-between opacity-0 hover:opacity-100 transition-opacity">
            <input-file accept="image/*" format="base64" @upload="setProfilePicture" class="flex justify-center items-center from-success/50 to-transparent bg-gradient-to-b basis-1/4 hover:basis-1/2 transition-all from-40%">
                <icon-upload-file class="size-6"/>
            </input-file>

            <button @click="removeProfilePicture" class="flex justify-center items-center from-error/50 hover:from-error to-transparent bg-gradient-to-t basis-1/4 hover:basis-1/2 transition-all from-40%">
                <icon-delete class="size-6"/>
            </button>
        </div>
    </div>
</template>