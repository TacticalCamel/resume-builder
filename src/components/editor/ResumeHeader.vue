<script setup lang="ts">
    import { ResumeHeader } from "@/models/resume/Header";
    import InputText from "@/components/shared/InputText.vue";
    import StylableElement from "@/components/editor/StylableElement.vue";
    import ResumeHeaderContactList from "@/components/editor/ResumeHeaderContactList.vue";
    import ResumeHeaderPicture from "@/components/editor/ResumeHeaderPicture.vue";

    const header = defineModel<ResumeHeader>({
        required: true
    });
</script>

<template>
    <stylable-element class="grid gap-12 pb-12" type="section" :id="header.id">
        <div class="text-nowrap flex gap-6 justify-center items-center">
            <stylable-element type="header-picture">
                <resume-header-picture v-model="header.picture" class="size-32"/>
            </stylable-element>

            <div class="flex flex-col items-start">
                <stylable-element type="header-name">
                    <input-text v-model="header.name" placeholder="Firstname Lastname" class="uppercase text-2xl font-semibold"/>
                </stylable-element>

                <stylable-element type="header-profession">
                    <input-text v-model="header.profession" placeholder="Profession" class="uppercase"/>
                </stylable-element>
            </div>

            <stylable-element type="header-contacts">
                <resume-header-contact-list v-model="header.contacts"/>
            </stylable-element>
        </div>

        <stylable-element type="header-description">
            <div class="text-justify mx-auto max-w-[720px]">
                <input-text v-model="header.description" placeholder="Medium length description that usually includes a short introduction, describes what you can offer to your future employer, and what are your career goals."/>
            </div>
        </stylable-element>
    </stylable-element>
</template>