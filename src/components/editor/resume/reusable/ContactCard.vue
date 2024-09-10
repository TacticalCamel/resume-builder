<script setup lang="ts">
    import { computed, inject } from "vue";
    import { useContactViews } from "@/composables/ContactViews";
    import { editableInjectionKey } from "@/main";
    import { Contact } from "@/models/resume/Header";
    import InputText from "@/components/shared/form/InputText.vue";

    const {getContactView} = useContactViews();

    const editable = inject<boolean>(editableInjectionKey, false);

    const contact = defineModel<Contact>({
        required: true
    });

    const view = computed(() => getContactView(contact.value.type));

    const url = computed(() => {
        if (editable || !view.value.createURL) {
            return undefined;
        }

        return view.value.createURL(contact.value.value);
    });
</script>

<template>
    <div class="p-0.5">
        <a class="flex items-center hover:transition-colors gap-2 [&:not[href='']]:hover:text-info" :href="url">
            <component :is="view.icon" class="size-5"/>
            <input-text v-model="contact.value" :placeholder="view.placeholder"/>
        </a>
    </div>
</template>