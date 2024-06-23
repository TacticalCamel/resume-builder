<script setup lang="ts">
    import IconPhone from "@/components/icons/IconPhone.vue";
    import IconEmail from "@/components/icons/IconEmail.vue";
    import IconGithub from "@/components/icons/IconGithub.vue";
    import IconLocation from "@/components/icons/IconLocation.vue";
    import type PersonalInfo from "@/models/PersonalInfo";
    import {type PropType} from "vue";
    import FileUpload from "@/components/shared/FileUpload.vue";
    import IconProfile from "@/components/icons/IconProfile.vue";

    const model = defineModel({
        type: Object as PropType<PersonalInfo>,
        required: true
    });

    defineProps({
        isEditMode: {
            type: Boolean,
            required: true
        }
    });

    // set the profile picture
    function setProfilePicture(contents: string) {
        model.value.picture = contents;
    }
</script>

<template>
    <div class="grid gap-12 max-w-[960px] mx-auto">
        <section class="text-nowrap flex gap-x-6 gap-y-12 justify-center items-center flex-col md:flex-row">
            <div class="flex items-center justify-center gap-6">
                <div class="size-32 rounded-full select-none shadow shadow-black relative">
                    <img v-if="model.picture" :src="model.picture" alt="profile picture" class="absolute size-full rounded-full">
                    <icon-profile class="absolute size-full p-4" v-else/>

                    <file-upload v-if="isEditMode" id="profile-picture-upload" accept="image/*" @on-upload="setProfilePicture" class="absolute flex items-center size-full rounded-full border-2 border-dashed border-amber-500 text-wrap bg-amber-500 bg-opacity-20 text-amber-500 opacity-0 hover:opacity-100 transition-opacity" read-data-url>
                        <span class="">Upload profile picture</span>
                    </file-upload>
                </div>

                <div class="me-4 flex flex-col">
                    <div class="uppercase font-bold text-2xl">{{ model.name }}</div>
                    <div class="uppercase">{{ model.profession }}</div>
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
</style>