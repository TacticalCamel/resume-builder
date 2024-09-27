<script setup lang="ts">
    import { Contact } from "@/models/resume/Header";
    import DraggableList from "@/components/editor/resume/generic/DraggableList.vue";
    import ContactCard from "@/components/editor/resume/reusable/ContactCard.vue";

    const contacts = defineModel<Contact[]>({
        required: true
    });
</script>

<template>
    <draggable-list
        v-model="contacts"
        group="Contact"
        class="text-sm grid gap-1.5"
    >
        <template #item="{index}: {index: number}">
            <contact-card v-model="contacts[index]"/>
        </template>

        <template #empty>
            <div class="list-placeholder px-2 h-12">Drag contacts here</div>
        </template>
    </draggable-list>
</template>