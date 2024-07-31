<script setup lang="ts">
    import EditorTab from "@/components/editor/tabs/EditorTab.vue";
    import EditorTabItem from "@/components/editor/tabs/EditorTabItem.vue";
    import FontList from "@/components/editor/FontList.vue";
</script>

<template>
    <editor-tab>
        <editor-tab-item>
            <div class="mb-1">TODO</div>
            <div class="text-foreground/70 text-sm">Search fonts by name</div>
        </editor-tab-item>

        <editor-tab-item>
            <div class="mb-1">TODO</div>
            <div class="text-foreground/70 text-sm">Scrollable font list</div>
        </editor-tab-item>

        <editor-tab-item>
            <div class="mb-1">TODO</div>
            <div class="text-foreground/70 text-sm">Display current font on top</div>
        </editor-tab-item>

        <editor-tab-item>
            <div class="mb-1">TODO</div>
            <div class="text-foreground/70 text-sm">Import font files</div>
        </editor-tab-item>

        <editor-tab-item title="fonts">
            <suspense>
               <font-list/>

                <template #fallback>
                    <div class="flex justify-center items-center p-2">
                        Loading fonts...
                    </div>
                </template>
            </suspense>
        </editor-tab-item>
    </editor-tab>
</template>