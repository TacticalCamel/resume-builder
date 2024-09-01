<script setup lang="ts">
    import { inject } from "vue";
    import { Contact, ContactView, ResumeHeader } from "@/models/resume/Header";
    import InputText from "@/components/shared/InputText.vue";
    import ProfilePicture from "@/components/editor/resume/ProfilePicture.vue";
    import DraggableList from "@/components/editor/resume/DraggableList.vue";

    const header = defineModel<ResumeHeader>({
        required: true
    });

    const editable = inject<boolean>('editable', false);
</script>

<template>
    <div class="grid gap-12 max-w-[960px] mx-auto pb-24">
        <div class="text-nowrap flex gap-6 justify-center items-center">
            <div class="flex items-center gap-6">
                <profile-picture v-model="header.picture" class="size-32"/>

                <div>
                    <input-text v-model="header.name" placeholder="Firstname Lastname" class="uppercase text-2xl font-semibold"/>
                    <input-text v-model="header.profession" placeholder="Profession" class="uppercase"/>
                </div>
            </div>

            <draggable-list
                v-model="header.contacts"
                :group="Contact.draggableCategory"
                class="text-sm grid gap-1.5"
            >
                <template #item="{element: contact}: {element: Contact}">
                    <div class="p-0.5">
                        <a
                            class="flex items-center hover:transition-colors gap-2"
                            :href="editable ? undefined : ContactView.BINDINGS[contact.type].createURL(contact.value)"
                            :class="editable || !ContactView.BINDINGS[contact.type].createURL(contact.value) ? undefined : 'hover:text-info'"
                        >
                            <component :is="ContactView.BINDINGS[contact.type].icon" class="size-5"/>
                            <input-text v-model="contact.value" :placeholder="ContactView.BINDINGS[contact.type].placeholder"/>
                        </a>
                    </div>
                </template>

                <template #empty>
                    <div class="list-placeholder px-2 h-12">Drag contacts here</div>
                </template>
            </draggable-list>
        </div>

        <div class="text-justify mx-auto max-w-[720px]">
            <input-text v-model="header.description" placeholder="Medium length description that usually includes a short introduction, describes what you can offer to your future employer, and what are your career goals."/>
        </div>
    </div>
</template>