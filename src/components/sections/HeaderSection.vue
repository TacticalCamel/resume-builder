<script setup lang="ts">
    import {inject, type PropType} from "vue";
    import draggable from "vuedraggable";
    import type HeaderSection from "@/models/sections/HeaderSection";
    import type SettingsModel from "@/models/SettingsModel";
    import IconPhone from "@/components/icons/IconPhone.vue";
    import IconEmail from "@/components/icons/IconEmail.vue";
    import IconGithub from "@/components/icons/IconGithub.vue";
    import IconLocation from "@/components/icons/IconLocation.vue";
    import IconClose from "@/components/icons/IconClose.vue";
    import IconUpload from "@/components/icons/IconUpload.vue";
    import IconProfile from "@/components/icons/IconProfile.vue";
    import FileUpload from "@/components/shared/FileUpload.vue";
    import EditText from "@/components/shared/EditText.vue";
    import {type ContactMap, type ContactKey} from "@/models/Contact";

    const model = defineModel({
        type: Object as PropType<HeaderSection>,
        required: true
    });

    const components: ContactMap = {
        email: {
            icon: IconEmail,
            link: (value: string) => `mailto:${value}`
        },
        phone: {
            icon: IconPhone,
            link: (_: string) => undefined
        },
        github: {
            icon: IconGithub,
            link: (value: string) => value.replace(/^(https:\/\/)/, "")
        },
        location: {
            icon: IconLocation,
            link: (_: string) => undefined
        }
    };

    const settings = inject<SettingsModel>('settings', {} as SettingsModel);

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
        <div class="text-nowrap flex gap-x-6 gap-y-12 justify-center items-center flex-col md:flex-row">
            <div class="flex items-center justify-center gap-3 mobile:gap-6">
                <div class="size-24 mobile:size-32 rounded-full select-none shadow shadow-black relative overflow-clip">
                    <img v-if="model.picture" :src="model.picture" alt="profile picture" class="absolute size-full rounded-full">
                    <icon-profile v-else class="absolute size-full p-4"/>

                    <div v-if="settings.editable" class="absolute size-full flex flex-col justify-between opacity-0 hover:opacity-100 transition-opacity">
                        <file-upload id="profile-picture-upload" accept="image/*" @on-upload="setProfilePicture" class="flex justify-center items-center from-[#22c55e80] to-transparent bg-gradient-to-b basis-1/4 hover:basis-1/2 hover:from-[#22c55ed0] transition-all from-40%" read-data-url>
                            <icon-upload class="size-6"/>
                        </file-upload>

                        <button @click="removeProfilePicture" class="flex justify-center items-center from-[#ef444480] to-transparent bg-gradient-to-t basis-1/4 hover:basis-1/2 hover:from-[#ef4444d0] transition-all from-40%">
                            <icon-close class="size-6"/>
                        </button>
                    </div>
                </div>

                <div class="me-4 flex flex-col">
                    <edit-text v-model="model.name" class="uppercase text-xl mobile:text-2xl font-bold"/>
                    <edit-text v-model="model.profession" class="uppercase text-sm mobile:text-base"/>
                </div>
            </div>
            <div class="text-[0.9em] grid gap-0.5">
                <transition-group>
                    <draggable
                        v-model="model.contacts"
                        item-key="id"
                        key="draggable"
                        :disabled="!settings.editable"
                        drag-class="dragging"
                        ghost-class="ghost"
                        animation="200"
                    >
                        <template #item="{element: contact}: {element: ContactKey}">
                            <a class="flex items-center py-1 hover:transition-colors" :href="settings.editable ? undefined : components[contact].link(model[contact])" :class="settings.editable ? undefined : 'url-hover'">
                                <component :is="components[contact].icon" class="size-5"/>
                                <edit-text class="ms-2" v-model="model[contact]"/>
                            </a>
                        </template>
                    </draggable>
                </transition-group>
            </div>
        </div>
        <div v-if="model" class="text-justify mx-auto max-w-[720px]">
            <edit-text v-model="model.description"/>
        </div>
    </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .url-hover:hover {
        color: var(--accent-text);
    }
</style>