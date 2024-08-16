<script setup lang="ts">
    import InputText from "@/components/shared/InputText.vue";
    import ResumeSection, { SectionModel } from "@/components/editor/resume/ResumeSection.vue";

    export interface LanguageList extends SectionModel<Language>{
        title: string
        elements: Language[]
    }

    export interface Language{
        name: string
        level: string
    }

    const model = defineModel<LanguageList>({
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
                <input-text v-model="language.name" placeholder="Language"/>
            </div>
            <div class="flex font-light">
                <input-text v-model="language.level" placeholder="Level"/>
            </div>
        </template>
    </resume-section>
</template>