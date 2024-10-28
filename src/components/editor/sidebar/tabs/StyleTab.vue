<script setup lang="ts">
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import EditorTab from "@/components/editor/sidebar/generic/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";

    const template = defineModel<ResumeTemplate>({
        required: true
    });
</script>

<template>
    <editor-tab>
        <editor-tab-item>
            
        </editor-tab-item>
    </editor-tab>
</template>

<style scoped lang="postcss">

</style>