<script setup lang="ts">
    import { ref } from "vue";
    import { useTemplateService } from "@/composables/TemplateService";
    import { useNavigation } from "@/composables/Navigation";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import TemplateCard from "@/components/templates/TemplateCard.vue";
    import Resume from "@/components/editor/resume/Resume.vue";

    const templateService = useTemplateService();
    const {navigateTo} = useNavigation();

    const preview = ref<ResumeTemplate | undefined>(undefined);

    function openPreview(template: ResumeTemplate) {
        preview.value = template;
    }

    function closePreview() {
        preview.value = undefined;
    }

    function loadToEditor(template: ResumeTemplate) {
        navigateTo('/editor', {load: template.id});
    }
</script>

<template>
    <div class="grow relative">
        <div class="absolute inset-0 scrollbar overflow-y-auto print:relative">
            <div v-if="preview" class="relative">
                <resume v-model="preview"/>

                <div class="absolute z-10 top-4 right-4 grid gap-2">
                    <button @click="closePreview()" class="px-2 py-1 text-error rounded bg-error/10 hover:bg-error/20 transition-colors">Close preview</button>
                    <button @click="loadToEditor(preview)" class="px-2 py-1 text-secondary rounded bg-secondary/10 hover:bg-secondary/20 transition-colors">Edit</button>
                </div>
            </div>

            <div v-else class="grid gap-16 mx-auto max-w-[1600px] p-8">
                <div class="grid gap-2">
                    <h1 class="text-xl font-semibold">Custom templates</h1>

                    <div class="flex flex-wrap gap-x-8 gap-y-6">
                        <template-card
                            v-for="(template, index) in templateService.templates"
                            v-model="templateService.templates[index]"
                            @preview="openPreview(template)"
                            @edit="loadToEditor(template)"
                        />
                    </div>
                </div>

                <div class="grid gap-2">
                    <h1 class="text-xl font-semibold">Predefined templates</h1>

                    <div class="flex flex-wrap gap-x-8 gap-y-6">
                        <template-card
                            v-for="(template, index) in templateService.predefinedTemplates"
                            v-model="templateService.predefinedTemplates[index]"
                            @preview="openPreview(template)"
                            @edit="loadToEditor(template)"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>