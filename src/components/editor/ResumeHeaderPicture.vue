<script setup lang="ts">
    import { useEditor } from "@/composables/useEditor";
    import IconProfile from "@/components/shared/IconProfile.vue";
    import InputFile from "@/components/shared/InputFile.vue";
    import IconDelete from "@/components/shared/IconDelete.vue";
    import IconUploadFile from "@/components/shared/IconUploadFile.vue";

    const picture = defineModel<string | undefined>({
        required: true
    });

    const {editable} = useEditor();

    function setProfilePicture(contents: string | ArrayBuffer) {
        if(typeof contents !== 'string') {
            return;
        }

        picture.value = contents;
    }

    function removeProfilePicture() {
        picture.value = undefined;
    }
</script>

<template>
    <div class="rounded-full select-none shadow shadow-black relative overflow-clip">
        <img v-if="picture" :src="picture" alt="profile picture" class="absolute size-full rounded-full">
        <icon-profile v-else class="absolute size-full p-4"/>

        <div v-if="editable" class="absolute size-full flex flex-col justify-between opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity">
            <input-file accept="image/*" format="base64" @upload="setProfilePicture" class="flex justify-center items-center from-success/50 to-transparent bg-gradient-to-b basis-1/4 hover:basis-1/2 focus:basis-1/2 transition-all from-40% outline-0">
                <icon-upload-file class="size-6"/>
            </input-file>

            <button @click="removeProfilePicture" class="flex justify-center items-center from-error/50 hover:from-error focus:from-error to-transparent bg-gradient-to-t basis-1/4 hover:basis-1/2 focus:basis-1/2 transition-all from-40% outline-0">
                <icon-delete class="size-6"/>
            </button>
        </div>
    </div>
</template>