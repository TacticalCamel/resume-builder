<script setup lang="ts">
    import { ref } from "vue";
    import { useTemplateService } from "@/composables/TemplateService";
    import { ResumeModel } from "@/models/resume/Resume";
    import TemplateCard from "@/components/templates/TemplateCard.vue";
    import Resume from "@/components/editor/resume/Resume.vue";
    import { useNavigationService } from "@/composables/NavigationService";

    const templateService = useTemplateService();
    const navigationService = useNavigationService();

    const preview = ref<ResumeModel | undefined>(undefined);

    function openPreview(template: ResumeModel) {
        preview.value = template;
    }

    function closePreview() {
        preview.value = undefined;
    }

    function loadToEditor(template: ResumeModel) {
        navigationService.navigateTo('/editor', {load: template.id});
    }
</script>

<template>
    <div>
        <div v-if="preview" class="relative">
            <resume v-model="preview"/>
            <div class="absolute z-10 top-4 right-4 grid gap-2">
                <button @click="closePreview()" class="px-2 py-1 text-error rounded bg-error/10 hover:bg-error/20 transition-colors">Close preview</button>
                <button @click="loadToEditor(preview)" class="px-2 py-1 text-secondary rounded bg-secondary/10 hover:bg-secondary/20 transition-colors">Edit</button>
            </div>
        </div>

        <div v-else class="grid gap-16 mx-auto max-w-[1600px] p-8">
            <div class="grid gap-2">
                <h1 class="text-xl font-semibold">Predefined templates</h1>
                <div class="flex flex-wrap gap-x-8 gap-y-6">
                    <template-card
                        v-for="(template, index) in templateService.templates"
                        v-model="templateService.templates[index]"
                        @preview="openPreview(template)"
                        @edit="loadToEditor(template)"
                    />
                </div>
            </div>

            <!--
            <div class="grid gap-2">
                <h1 class="text-xl font-semibold">Custom templates</h1>
                <div class="flex flex-wrap gap-x-8 gap-y-6">
                    <template-card
                        v-for="(_, index) in templateService.templates"
                        v-model="templateService.templates[index]"
                    />
                </div>
            </div>
            -->
        </div>
    </div>
</template>