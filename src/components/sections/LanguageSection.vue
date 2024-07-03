<script setup lang="ts">
    import type LanguageSection from "@/models/sections/LanguageSection";
    import type Language from "@/models/elements/Language";
    import EditText from "@/components/shared/EditText.vue";
    import ResumeSection from "@/components/shared/ResumeSection.vue";

    const model = defineModel<LanguageSection>({
        required: true
    });
</script>

<template>
    <resume-section
        v-model="model"
        group="language"
        :gap-x="4"
        :gap-y="0.125"
        :sub-grid-columns="2"
    >
        <template #item="{element: language}: {element: Language}">
            <div class="flex">
                <edit-text v-model="language.name" placeholder="Language"/>
            </div>
            <div class="flex font-light">
                <edit-text v-model="language.level" placeholder="Level"/>
            </div>
        </template>
    </resume-section>
</template>