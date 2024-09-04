<script setup lang="ts">
    import EditorTab from "@/components/editor/sidebar/generic/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";

    const style: object = window.getComputedStyle(document.body);
</script>

<template>
    <editor-tab>
        <editor-tab-item>
            <div class="grid grid-cols-2 gap-2 text-sm">
                <template v-for="key in style">
                    <div class="font-medium">{{ key }}</div>
                    <div>
                        <input type="text" :placeholder="style[key]" class="bg-transparent font-light w-full"/>
                    </div>
                </template>
            </div>
        </editor-tab-item>
    </editor-tab>
</template>