<script setup lang="ts">
    import { ResumeHeader } from "@/models/resume/Header";
    import InputText from "@/components/shared/form/InputText.vue";
    import ProfilePicture from "@/components/editor/resume/reusable/ProfilePicture.vue";
    import ContactList from "@/components/editor/resume/reusable/ContactList.vue";
    import StylableElement from "@/components/editor/resume/generic/StylableElement.vue";

    const header = defineModel<ResumeHeader>({
        required: true
    });
</script>

<template>
    <stylable-element class="grid gap-12 pb-12" class-selector="section" :id="header.id">
        <div class="text-nowrap flex gap-6 justify-center items-center">
            <stylable-element id="header-picture" class-selector="header-picture">
                <profile-picture v-model="header.picture" class="size-32"/>
            </stylable-element>

            <div class="flex flex-col items-start">
                <stylable-element id="header-name" class-selector="header-name">
                    <input-text v-model="header.name" placeholder="Firstname Lastname" class="uppercase text-2xl font-semibold"/>
                </stylable-element>

                <stylable-element id="header-profession" class-selector="header-profession">
                    <input-text v-model="header.profession" placeholder="Profession" class="uppercase"/>
                </stylable-element>
            </div>

            <stylable-element id="header-contacts" class-selector="header-contacts">
                <contact-list v-model="header.contacts"/>
            </stylable-element>
        </div>

        <stylable-element id="header-description" class-selector="header-description">
            <div class="text-justify mx-auto max-w-[720px]">
                <input-text v-model="header.description" placeholder="Medium length description that usually includes a short introduction, describes what you can offer to your future employer, and what are your career goals."/>
            </div>
        </stylable-element>
    </stylable-element>
</template>