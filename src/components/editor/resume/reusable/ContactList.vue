<script setup lang="ts">
    import { Contact } from "@/models/resume/Header";
    import DraggableList from "@/components/editor/resume/generic/DraggableList.vue";
    import ContactCard from "@/components/editor/resume/reusable/ContactCard.vue";
    import StylableElement from "@/components/editor/resume/generic/StylableElement.vue";

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
            <stylable-element :id="contact.id" class-selector="contact">
                <contact-card v-model="contacts[index]" :key="contacts[index].id"/>
            </stylable-element>
        </template>

        <template #empty>
            <span class="p-2">Drag contacts here</span>
        </template>
    </draggable-list>
</template>