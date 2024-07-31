<script setup lang="ts">
    import draggable from "vuedraggable";
    import HeaderSection from "@/models/sections/HeaderSection";
    import { checkGroupMatch } from "@/models/BuildingBlock";
    import { contacts, type ContactMap } from "@/models/ContactMap";
    import IconUpload from "@/components/icons/IconUpload.vue";
    import IconProfile from "@/components/icons/IconProfile.vue";
    import FileUpload from "@/components/shared/FileUpload.vue";
    import EditText from "@/components/shared/EditText.vue";
    import IconDelete from "@/components/icons/IconDelete.vue";
    import { settings } from "@/main";

    const model = defineModel<HeaderSection>({
        required: true
    });

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
        <div class="text-nowrap flex gap-6 justify-center items-center flex-col md:flex-row print:flex-row">
            <!-- left side -->
            <div class="flex items-center justify-center gap-3 mobile:gap-6 print:gap-6">
                <!-- profile picture -->
                <div class="size-24 mobile:size-32 rounded-full select-none shadow shadow-black relative overflow-clip">
                    <img v-if="model.picture" :src="model.picture" alt="profile picture" class="absolute size-full rounded-full">
                    <icon-profile v-else class="absolute size-full p-4"/>

                    <div v-if="settings.editable" class="absolute size-full flex flex-col justify-between opacity-0 hover:opacity-100 transition-opacity">
                        <file-upload id="profile-picture-upload" accept="image/*" @on-upload="setProfilePicture" class="flex justify-center items-center from-success/50 to-transparent bg-gradient-to-b basis-1/4 hover:basis-1/2 transition-all from-40%" read-data-url>
                            <icon-upload class="size-6"/>
                        </file-upload>

                        <button @click="removeProfilePicture" class="flex justify-center items-center from-error/50 hover:from-error to-transparent bg-gradient-to-t basis-1/4 hover:basis-1/2 transition-all from-40%">
                            <icon-delete class="size-6"/>
                        </button>
                    </div>
                </div>

                <!-- name and profession -->
                <div class="flex flex-col items-start">
                    <edit-text v-model="model.name" placeholder="Firstname Lastname" class="uppercase text-xl mobile:text-2xl font-bold"/>
                    <edit-text v-model="model.profession" placeholder="Profession" class="uppercase text-sm mobile:text-base"/>
                </div>
            </div>

            <!-- contacts -->
            <transition-group>
                <draggable
                    v-model="model.contacts"
                    item-key="id"
                    key="draggable"
                    :group="{name: 'contact', pull: true, put: checkGroupMatch}"
                    :disabled="!settings.editable"
                    drag-class="dragging"
                    ghost-class="ghost"
                    animation="200"
                    class="text-sm grid gap-1.5"
                >
                    <template #item="{element: key}: {element: keyof ContactMap}">
                        <div class="p-0.5 drag-item" :class="{'moveable': settings.editable}">
                            <a class="flex items-center hover:transition-colors gap-2" :href="settings.editable ? undefined : contacts[key].createURL(model[key])" :class="settings.editable || !contacts[key].createURL(model[key]) ? undefined : 'hover:text-primary'">
                                <component :is="contacts[key].icon" class="size-5"/>
                                <edit-text v-model="model[key]" :placeholder="contacts[key].placeholder"/>
                            </a>
                        </div>
                    </template>
                </draggable>
            </transition-group>
        </div>

        <!-- description -->
        <div v-if="model" class="text-justify mx-auto max-w-[720px]">
            <edit-text v-model="model.description" placeholder="Medium length description that usually includes a short introduction, describes what is it can you offer for your future employer, and what are your career goals."/>
        </div>
    </div>
</template>