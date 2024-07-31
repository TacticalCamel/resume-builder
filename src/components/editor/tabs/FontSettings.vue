<script setup lang="ts">
    import draggable from "vuedraggable";
    import { checkGroupMatch } from "@/models/BuildingBlock";
    import { fontService } from "@/main";
    import FontCard from "@/components/editor/FontCard.vue";
    import EditorTab from "@/components/editor/tabs/EditorTab.vue";
    import EditorTabItem from "@/components/editor/tabs/EditorTabItem.vue";

    function setFont(font: string | null): void {
        fontService.currentFont = font;
    }
</script>

<template>
    <editor-tab>
        <editor-tab-item title="fonts">
            <transition-group>
                <draggable
                    v-model="fontService.availableFonts.value"
                    item-key="id"
                    key="draggable"
                    drag-class="dragging"
                    ghost-class="ghost"
                    animation="200"
                    class="flex flex-col gap-1"
                    :group="{name: 'font', pull: true, put: checkGroupMatch}"
                >
                    <template #header>
                        <font-card :font="fontService.defaultFont" :is-default="true" @click="setFont(null)"/>
                    </template>

                    <template #item="{element: font}: {element: string}">
                        <font-card :font="font" @click="setFont(font)"/>
                    </template>
                </draggable>
            </transition-group>
        </editor-tab-item>
    </editor-tab>
</template>