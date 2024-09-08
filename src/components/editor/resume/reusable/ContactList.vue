<script setup lang="ts">
    import { inject } from "vue";
    import { editableInjectionKey } from "@/main";
    import { Contact, ContactView } from "@/models/resume/Header";
    import DraggableList from "@/components/editor/resume/generic/DraggableList.vue";
    import InputText from "@/components/shared/form/InputText.vue";


    const contacts = defineModel<Contact[]>({
        required: true
    });

    const editable = inject<boolean>(editableInjectionKey, false);
</script>

<template>
    <draggable-list
        v-model="contacts"
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
</template>