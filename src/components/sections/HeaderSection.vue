<script setup lang="ts">
    import IconPhone from "@/components/icons/IconPhone.vue";
    import IconEmail from "@/components/icons/IconEmail.vue";
    import IconGithub from "@/components/icons/IconGithub.vue";
    import IconLocation from "@/components/icons/IconLocation.vue";
    import type PersonalInfo from "@/models/PersonalInfo";
    import {type PropType} from "vue";
    import FileUpload from "@/components/shared/FileUpload.vue";

    const model = defineModel('model', {
        type: Object as PropType<PersonalInfo>,
        required: true
    });

    const profilePicture = defineModel('profilePicture', {
        type: Object as PropType<string | null>,
        required: true
    });

    // set the profile picture
    function setProfilePicture(contents: string) {
        profilePicture.value = contents;
    }
</script>

<template>
    <div class="grid gap-12 max-w-[960px] mx-auto">
        <section class="text-nowrap flex gap-x-6 gap-y-12 justify-center items-center flex-col md:flex-row">
            <div class="flex items-center justify-center gap-6">
                <div class="size-32 rounded-full select-none shadow shadow-black">
                    <img v-if="profilePicture" :src="profilePicture" alt="profile picture" class="size-full rounded-full">
                    <file-upload v-else id="profile-picture-upload" accept="image/*" @on-upload="setProfilePicture" class="flex size-full rounded-full border-2 border-dashed border-red-500 text-wrap hover:bg-red-500 hover:transition-colors hover:bg-opacity-20 items-center text-red-500" read-data-url>
                        Upload profile picture
                    </file-upload>
                </div>

                <div class="me-4 flex flex-col">
                    <input :size="model.name.length" class="uppercase font-bold text-2xl" v-model="model.name"/>
                    <input :size="model.profession.length" class="uppercase" v-model="model.profession"/>
                </div>
            </div>
            <div v-if="model" class="text-[0.9em] contacts grid gap-0.5">
                <a class="flex items-center py-1 url-hover hover:transition-colors" :href="`mailto:${model.email}`">
                    <icon-email class="size-5"/>
                    <span class="ps-2">{{ model.email }}</span>
                </a>
                <div class="flex items-center py-1">
                    <icon-phone class="size-5"/>
                    <span class="ps-2">{{ model.phone }}</span>
                </div>
                <a class="flex items-center py-1 url-hover hover:transition-colors" :href="model.github" target="_blank">
                    <icon-github class="size-5"/>
                    <span class="ps-2">{{ model.github.replace(/^(https\:\/\/)/, "") }}</span>
                </a>
                <div class="flex items-center py-1">
                    <icon-location class="size-5"/>
                    <span class="ps-2">{{ model.location }}</span>
                </div>
            </div>
        </section>
        <section v-if="model" class="text-justify mx-auto max-w-[720px]">
            {{ model.description }}
        </section>
    </div>
</template>

<style scoped>
    .url-hover:hover {
        color: var(--accent-text);
    }

    input {
        background-color: transparent;
        resize: horizontal;
    }
</style>