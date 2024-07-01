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
    <resume-section v-model="model" group="language">
        <template #item="{element: language}: {element: Language}">
            <td class="pe-16">
                <edit-text v-model="language.name"/>
            </td>
            <td class="font-light">
                <edit-text v-model="language.level"/>
            </td>
        </template>
    </resume-section>
</template>