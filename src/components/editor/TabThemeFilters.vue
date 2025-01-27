<script setup lang="ts">
    import { Filter } from "@/models/Filter";
    import InputRange from "@/components/shared/InputRange.vue";
    import EditorSidebarTabItem from "@/components/editor/EditorSidebarTabItem.vue";

    const filters = defineModel<Filter>({
        required: true
    });
</script>

<template>
    <editor-sidebar-tab-item title="filters">
        <div class="grid grid-cols-[auto_1fr] items-center gap-x-8 gap-y-2 text-foreground/70">
            <div>Grayscale</div>
            <input-range :min="0" :max="100" :step="5" unit="%" v-model="filters.grayscale"/>

            <div>Contrast</div>
            <input-range :min="50" :max="150" :step="5" unit="%" v-model="filters.contrast"/>

            <div>Brightness</div>
            <input-range :min="50" :max="150" :step="5" unit="%" v-model="filters.brightness"/>
        </div>
    </editor-sidebar-tab-item>
</template>