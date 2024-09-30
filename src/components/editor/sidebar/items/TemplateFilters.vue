<script setup lang="ts">
    import { Filters } from "@/models/style/Filters";
    import InputRange from "@/components/shared/form/InputRange.vue";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";

    const filters = defineModel<Filters>({
        required: true
    });
</script>

<template>
    <editor-tab-item title="filters">
        <div class="grid grid-cols-[auto_1fr] items-center gap-x-8 gap-y-2 text-foreground/70">
            <div>Grayscale</div>
            <input-range :min="0" :max="100" :step="5" unit="%" v-model="filters.grayscale"/>

            <div>Contrast</div>
            <input-range :min="50" :max="150" :step="5" unit="%" v-model="filters.contrast"/>

            <div>Brightness</div>
            <input-range :min="50" :max="150" :step="5" unit="%" v-model="filters.brightness"/>
        </div>
    </editor-tab-item>
</template>