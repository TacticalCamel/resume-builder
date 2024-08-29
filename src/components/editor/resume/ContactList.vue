<script setup lang="ts">
    import { inject } from "vue";
    import { canDragToList } from "@/models/BuildingBlock";
    import draggable from "vuedraggable";
    import InputText from "@/components/shared/InputText.vue";
    import { Contact, ContactView } from "@/models/resume/Header";

    const editable = inject<boolean>('editable', false);

    const contacts = defineModel<Contact[]>({
        required: true
    });
</script>

<template>
    <div>
        <transition-group>
            <draggable
                v-model="contacts"
                item-key="id"
                key="draggable"
                :group="{name: 'contact', pull: true, put: canDragToList}"
                :disabled="!editable"
                drag-class="dragging"
                ghost-class="ghost"
                animation="200"
                class="text-sm grid gap-1.5"
            >
                <template #item="{element: contact, index}: {element: Contact, index: number}">
                    <div class="p-0.5" :class="{'moveable': editable}">
                        <a
                            class="flex items-center hover:transition-colors gap-2"
                            :href="editable ? undefined : ContactView.BINDINGS[contact.type].createURL(contact.value)"
                            :class="editable || !ContactView.BINDINGS[contact.type].createURL(contact.value) ? undefined : 'hover:text-primary'"
                        >
                            <component :is="ContactView.BINDINGS[contact.type].icon" class="size-5"/>
                            <input-text v-model="contacts[index].value" :placeholder="ContactView.BINDINGS[contact.type].placeholder"/>
                        </a>
                    </div>
                </template>
            </draggable>
        </transition-group>
    </div>
</template>