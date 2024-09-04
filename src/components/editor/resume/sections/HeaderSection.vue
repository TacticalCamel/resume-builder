<script setup lang="ts">
    import { ResumeHeader } from "@/models/resume/Header";
    import InputText from "@/components/shared/form/InputText.vue";
    import ProfilePicture from "@/components/editor/resume/reusable/ProfilePicture.vue";
    import ContactList from "@/components/editor/resume/reusable/ContactList.vue";

    const header = defineModel<ResumeHeader>({
        required: true
    });
</script>

<template>
    <div class="grid gap-12 max-w-[960px] mx-auto pb-12">
        <div class="text-nowrap flex gap-6 justify-center items-center">
            <div class="flex items-center gap-6">
                <profile-picture v-model="header.picture" class="size-32"/>

                <div>
                    <input-text v-model="header.name" placeholder="Firstname Lastname" class="uppercase text-2xl font-semibold"/>
                    <input-text v-model="header.profession" placeholder="Profession" class="uppercase"/>
                </div>
            </div>

            <contact-list v-model="header.contacts"/>
        </div>

        <div class="text-justify mx-auto max-w-[720px]">
            <input-text v-model="header.description" placeholder="Medium length description that usually includes a short introduction, describes what you can offer to your future employer, and what are your career goals."/>
        </div>
    </div>
</template>