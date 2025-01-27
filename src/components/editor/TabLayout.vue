<script setup lang="ts">
    import { getLayoutGroups } from "@/functions/ResumeLayout";
    import { LayoutGroup } from "@/models/bindings/LayoutGroup";
    import EditorSidebarTab from "@/components/editor/EditorSidebarTab.vue";
    import TabLayoutGroup from "@/components/editor/TabLayoutGroup.vue";
    import TabLayoutDelete from "@/components/editor/TabLayoutDelete.vue";

    const groups: LayoutGroup[] = getLayoutGroups();
</script>

<template>
    <editor-sidebar-tab>
        <tab-layout-group
            v-for="group in groups"
            :group="group"
        />

        <tab-layout-delete/>
    </editor-sidebar-tab>
</template>