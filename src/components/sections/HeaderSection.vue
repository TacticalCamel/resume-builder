<script setup lang="ts">
    import IconPhone from "@/components/icons/IconPhone.vue";
    import IconEmail from "@/components/icons/IconEmail.vue";
    import IconGithub from "@/components/icons/IconGithub.vue";
    import IconLocation from "@/components/icons/IconLocation.vue";
    import type PersonalInfo from "@/models/PersonalInfo";
    import {inject, type PropType} from "vue";
    import FileUpload from "@/components/shared/FileUpload.vue";
    import IconProfile from "@/components/icons/IconProfile.vue";
    import EditText from "@/components/shared/EditText.vue";
    import IconClose from "@/components/icons/IconClose.vue";
    import IconUpload from "@/components/icons/IconUpload.vue";

    const model = defineModel({
        type: Object as PropType<PersonalInfo>,
        required: true
    });

    const editable = inject<boolean>('isEditMode', false);

    // set the profile picture
    function setProfilePicture(contents: string) {
        model.value.picture = contents;
    }

    // remove the profile picture
    function removeProfilePicture() {
        model.value.picture = null;
    }
</script>

<template>
    <div class="grid gap-12 max-w-[960px] mx-auto">
        <section class="text-nowrap flex gap-x-6 gap-y-12 justify-center items-center flex-col md:flex-row">
            <div class="flex items-center justify-center gap-3 mobile:gap-6">
                <div class="size-24 mobile:size-32 rounded-full select-none shadow shadow-black relative overflow-clip">
                    <img v-if="model.picture" :src="model.picture" alt="profile picture" class="absolute size-full rounded-full">
                    <icon-profile v-else class="absolute size-full p-4"/>

                    <div v-if="editable" class="absolute size-full flex flex-col justify-between opacity-0 hover:opacity-100 transition-opacity">
                        <file-upload id="profile-picture-upload" accept="image/*" @on-upload="setProfilePicture" class="flex justify-center items-center from-[#22c55e80] to-transparent bg-gradient-to-b basis-1/4 hover:basis-1/2 hover:from-green-500 transition-all from-40%" read-data-url>
                            <icon-upload class="size-6"/>
                        </file-upload>

                        <button @click="removeProfilePicture" class="flex justify-center items-center from-[#ef444480] to-transparent bg-gradient-to-t basis-1/4 hover:basis-1/2 hover:from-red-500 transition-all from-40%">
                            <icon-close class="size-6"/>
                        </button>
                    </div>
                </div>

                <div class="me-4 flex flex-col">
                    <edit-text v-model="model.name" class="uppercase text-xl mobile:text-2xl font-bold"/>
                    <edit-text v-model="model.profession" class="uppercase text-sm mobile:text-base"/>
                </div>
            </div>
            <div v-if="model" class="text-[0.9em] contacts grid gap-0.5">
                <a class="flex items-center py-1 hover:transition-colors" :href="editable ? undefined : `mailto:${model.email}`" :class="editable ? undefined : 'url-hover'">
                    <icon-email class="size-5"/>
                    <edit-text class="ms-2" v-model="model.email"/>
                </a>
                <div class="flex items-center py-1">
                    <icon-phone class="size-5"/>
                    <edit-text v-model="model.phone" class="ms-2"/>
                </div>
                <a class="flex items-center py-1 hover:transition-colors" :href="editable ? undefined : model.github" target="_blank" :class="editable ? undefined : 'url-hover'">
                    <icon-github class="size-5"/>
                    <edit-text v-model="model.github" class="ms-2"/>
                </a>
                <div class="flex items-center py-1">
                    <icon-location class="size-5"/>
                    <edit-text v-model="model.location" class="ms-2"/>
                </div>
            </div>
        </section>
        <section v-if="model" class="text-justify mx-auto max-w-[720px]">
            <edit-text v-model="model.description"/>
        </section>
    </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .url-hover:hover {
        color: var(--accent-text);
    }

    .tooltip:hover > aside {
        display: flex;
    }
</style>