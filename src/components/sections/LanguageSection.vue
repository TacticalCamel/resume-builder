<script setup lang="ts">
    import {type PropType} from "vue";
    import type LanguageSection from "@/models/sections/LanguageSection";
    import type Language from "@/models/elements/Language";
    import EditText from "@/components/shared/EditText.vue";
    import ResumeSection from "@/components/sections/ResumeSection.vue";

    const model = defineModel({
        type: Object as PropType<LanguageSection>,
        required: true
    });

    function addLanguage() {
        model.value.elements.push({
            name: '',
            level: ''
        });
    }
</script>

<template>
    <resume-section v-model="model" @on-add="addLanguage">
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