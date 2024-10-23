<script setup lang="ts">
    import { useNavigation } from "@/composables/useNavigation";
    import { useTemplates } from "@/composables/useTemplates";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import TemplateCard from "@/components/templates/items/TemplateCard.vue";
    import TemplateLink from "@/components/templates/items/TemplateLink.vue";

    const {navigateTo} = useNavigation();
    const {getPresetTemplates, getCustomTemplates, setTemplate} = useTemplates();

    const groups = {
        'Your templates': await getCustomTemplates(),
        'Preset templates': await getPresetTemplates()
    };

    async function loadToEditor(template: ResumeTemplate, copy: boolean) {
        let id: string = template.id;

        if (copy) {
            id = await setTemplate(template, true);
        }

        navigateTo('/editor', {load: id});
    }
</script>

<template>
    <div class="absolute inset-0 scrollbar overflow-y-auto flex justify-center gap-24 py-10 px-3">
        <div class="grid grow max-w-[960px] gap-12 mb-10">
            <template v-for="(group, groupName) in groups">
                <template-card
                    v-for="template in group"
                    :template="template"
                    :scale="0.75"
                    :id="template.id"
                    class="h-[960px]"
                    @edit="loadToEditor(template, groupName === 'Preset templates')"
                />
            </template>

            <div class="h-1 pointer-events-none"/>
        </div>

        <div class="flex flex-col gap-6 pt-4 sticky top-0">
            <div v-for="(group, name) in groups">
                <div class="font-semibold uppercase">{{ name }}</div>
                <template-link v-for="template in group" :template/>
            </div>
        </div>
    </div>
</template>