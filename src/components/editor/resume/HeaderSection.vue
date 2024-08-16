<script setup lang="ts">
    import draggable from "vuedraggable";
    import { settings } from "@/main";
    import { checkGroupMatch } from "@/models/BuildingBlock";
    import InputText from "@/components/shared/InputText.vue";
    import { ContactMap, contacts } from "@/models/ContactMap";
    import ProfilePicture from "@/components/editor/resume/ProfilePicture.vue";

    export interface HeaderSectionModel {
        picture: string | null
        name: string
        profession: string
        description: string
        contacts: string[]
        phone: string
        email: string
        github: string
        location: string
        linkedin: string
    }

    const model = defineModel<HeaderSectionModel>({
        required: true
    });
</script>

<template>
    <div class="grid gap-12 max-w-[960px] mx-auto pb-24">
        <div class="text-nowrap flex gap-6 justify-center items-center flex-col md:flex-row print:flex-row">
            <div class="flex items-center gap-6">
                <profile-picture v-model="model.picture" class="size-32"/>

                <div>
                    <input-text v-model="model.name" placeholder="Firstname Lastname" class="uppercase text-2xl font-semibold"/>
                    <input-text v-model="model.profession" placeholder="Profession" class="uppercase"/>
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
                        <div class="p-0.5" :class="{'moveable': settings.editable}">
                            <a class="flex items-center hover:transition-colors gap-2" :href="settings.editable ? undefined : contacts[key].createURL(model[key])" :class="settings.editable || !contacts[key].createURL(model[key]) ? undefined : 'hover:text-primary'">
                                <component :is="contacts[key].icon" class="size-5"/>
                                <input-text v-model="model[key]" :placeholder="contacts[key].placeholder"/>
                            </a>
                        </div>
                    </template>
                </draggable>
            </transition-group>
        </div>

        <!-- description -->
        <div v-if="model" class="text-justify mx-auto max-w-[720px]">
            <input-text v-model="model.description" placeholder="Medium length description that usually includes a short introduction, describes what you can offer to your future employer, and what are your career goals."/>
        </div>
    </div>
</template>