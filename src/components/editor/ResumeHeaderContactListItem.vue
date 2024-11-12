<script setup lang="ts">
    import { Component as ComponentType, computed } from "vue";
    import { useEditor } from "@/composables/useEditor";
    import { Contact, ContactType } from "@/models/resume/Header";
    import InputText from "@/components/shared/form/InputText.vue";
    import IconEmail from "@/components/shared/icons/IconEmail.vue";
    import IconPhone from "@/components/shared/icons/IconPhone.vue";
    import IconGithub from "@/components/shared/icons/IconGithub.vue";
    import IconLocation from "@/components/shared/icons/IconLocation.vue";
    import IconLinkedIn from "@/components/shared/icons/IconLinkedIn.vue";

    const {viewable} = useEditor();

    const contact = defineModel<Contact>({
        required: true
    });

    const icon = computed<ComponentType | undefined>(() => {
        switch (contact.value.type) {
            case ContactType.email:
                return IconEmail;
            case ContactType.phone:
                return IconPhone;
            case ContactType.github:
                return IconGithub;
            case ContactType.location:
                return IconLocation;
            case ContactType.linkedin:
                return IconLinkedIn;
        }
    });

    const placeholder = computed<string | undefined>(() => {
        switch (contact.value.type) {
            case ContactType.email:
                return 'Email address';
            case ContactType.phone:
                return 'Phone number';
            case ContactType.github:
                return 'Github profile URL';
            case ContactType.location:
                return 'Physical location';
            case ContactType.linkedin:
                return 'LinkedIn profile URL';
        }
    });

    const url = computed<string | undefined>(() => {
        if (!viewable.value) {
            return undefined;
        }

        switch (contact.value.type) {
            case ContactType.email:
                return `mailto:${contact.value.value}`;
            case ContactType.github:
                return contact.value.value;
            case ContactType.linkedin:
                return contact.value.value;
        }
    });
</script>

<template>
    <a class="flex items-center hover:transition-colors gap-2 [&:not[href='']]:hover:text-info p-0.5" :href="url">
        <component :is="icon" class="size-5"/>
        <input-text v-model="contact.value" :placeholder="placeholder"/>
    </a>
</template>