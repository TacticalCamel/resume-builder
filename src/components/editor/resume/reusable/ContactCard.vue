<script setup lang="ts">
    import { computed, Component as ComponentType } from "vue";
    import { useEditable } from "@/composables/useEditable";
    import { Contact, ContactType } from "@/models/resume/Header";
    import InputText from "@/components/shared/form/InputText.vue";
    import IconEmail from "@/components/shared/icons/IconEmail.vue";
    import IconPhone from "@/components/shared/icons/IconPhone.vue";
    import IconGithub from "@/components/shared/icons/IconGithub.vue";
    import IconLocation from "@/components/shared/icons/IconLocation.vue";
    import IconLinkedIn from "@/components/shared/icons/IconLinkedIn.vue";

    const {editable} = useEditable();

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
        if(editable) {
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
    <div class="p-0.5">
        <a class="flex items-center hover:transition-colors gap-2 [&:not[href='']]:hover:text-info" :href="url">
            <component :is="icon" class="size-5"/>
            <input-text v-model="contact.value" :placeholder="placeholder"/>
        </a>
    </div>
</template>