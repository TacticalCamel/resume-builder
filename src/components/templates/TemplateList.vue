<script setup lang="ts">
    import { useNavigation } from "@/composables/useNavigation";
    import { useTemplates } from "@/composables/useTemplates";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import TemplateCard from "@/components/templates/TemplateCard.vue";

    const {navigateTo} = useNavigation();
    const {getPresetTemplates, getCustomTemplates} = useTemplates();

    const groups = {
        'Your templates': await getCustomTemplates(),
        'Preset templates': await getPresetTemplates()
    };

    function loadToEditor(template: ResumeTemplate) {
        navigateTo('/editor', {load: template.id});
    }
</script>

<template>
    <div class="max-w-[1280px] grow mx-auto flex gap-16 items-start py-10 px-3">
        <div class="grid gap-6 px-8 py-4 bg-foreground/5 rounded-lg">
            <div v-for="(group, name) in groups" class="grid gap-1">
                <div class="text-lg font-semibold uppercase">{{ name }}</div>
                <a :href="'#' + template.id" v-for="template in group" class="px-2 py-0.5 text-foreground/70 flex gap-2 items-center rounded hover:bg-foreground/10 transition-colors hover:text-secondary">
                    <span v-if="template.resume.header.name.length" class="">{{ template.resume.header.name }}</span>
                    <span v-else class="italic">Unnamed</span>

                    <span>-</span>

                    <span v-if="template.resume.header.profession.length">{{ template.resume.header.profession }}</span>
                    <span v-else class="italic">No profession</span>
                </a>
            </div>
        </div>

        <div class="grid grow gap-12">
            <template v-for="group in groups">
                <template-card
                    v-for="template in group"
                    :template="template"
                    :scale="1"
                    :id="template.id"
                    class="h-[960px] overflow-clip"
                    @edit="loadToEditor(template)"
                />
            </template>
        </div>
    </div>
</template>