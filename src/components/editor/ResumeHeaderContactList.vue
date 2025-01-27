<script setup lang="ts">
    import { Contact } from "@/models/resume/Header";
    import DraggableList from "@/components/editor/DraggableList.vue";
    import StylableElement from "@/components/editor/StylableElement.vue";
    import ResumeHeaderContactListItem from "@/components/editor/ResumeHeaderContactListItem.vue";

    const contacts = defineModel<Contact[]>({
        required: true
    });
</script>

<template>
    <draggable-list
        v-model="contacts"
        group="contact"
        class="text-sm grid gap-1.5"
    >
        <template #item="{element: contact, index}: {element: Contact, index: number}">
            <stylable-element :id="contact.id" type="contact">
                <resume-header-contact-list-item
                    v-model="contacts[index]"
                    :key="contacts[index].id"
                />
            </stylable-element>
        </template>

        <template #empty>
            <span class="p-2">Drag contacts here</span>
        </template>
    </draggable-list>
</template>