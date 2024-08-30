<script setup lang="ts">
    import EditorTab from "@/components/editor/sidebar/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/EditorTabItem.vue";

    const style = window.getComputedStyle(document.body);
</script>

<template>
    <editor-tab>
        <editor-tab-item>
            <div class="grid grid-cols-2 gap-2 text-sm">
                <template v-for="key in style">
                    <div class="font-medium">{{ key }}</div>
                    <div class="text-foreground/70 font-light">{{ style[key as keyof CSSStyleDeclaration] }}</div>
                </template>
            </div>
        </editor-tab-item>
    </editor-tab>
</template>

<style scoped>

</style>