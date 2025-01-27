<script setup lang="ts">
    import { TemplateModel } from "@/models/Template";
    import EditorSidebarTab from "@/components/editor/EditorSidebarTab.vue";
    import TabTransferSave from "@/components/editor/TabTransferSave.vue";
    import TabTransferImport from "@/components/editor/TabTransferImport.vue";
    import TabTransferExport from "@/components/editor/TabTransferExport.vue";
    import TabTransferDelete from "@/components/editor/TabTransferDelete.vue";

    const template = defineModel<TemplateModel>({
        required: true
    });
</script>

<template>
    <editor-sidebar-tab>
        <tab-transfer-save :template="template"/>

        <tab-transfer-import/>

        <tab-transfer-export :template="template"/>

        <tab-transfer-delete :template="template"/>
    </editor-sidebar-tab>
</template>