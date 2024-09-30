<script setup lang="ts">
    import { ref } from "vue";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import EditorSidebar from "@/components/editor/sidebar/EditorSidebar.vue";
    import Resume from "@/components/editor/resume/Resume.vue";

    const template = ref<ResumeTemplate | undefined>(undefined);
</script>

<template>
    <div v-if="template" class="flex grow">
        <div class="relative w-[440px] print:hidden">
            <div class="absolute inset-0">
                <editor-sidebar v-model:template="template"/>
            </div>
        </div>

        <div class="relative grow">
            <resume
                v-model="template"
                class="absolute inset-0 scrollbar overflow-y-scroll overflow-x-clip print:relative print:h-full"
                editable
            />
        </div>
    </div>
</template>

<style scoped lang="postcss">

</style>