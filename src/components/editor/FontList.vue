<script setup lang="ts">
    import { ref } from "vue";
    import draggable from "vuedraggable";
    import { fontService } from "@/main";
    import { checkGroupMatch } from "@/models/BuildingBlock";
    import FontCard from "@/components/editor/FontCard.vue";
    import FontService from "@/services/FontService";
    import FontData from "@/models/FontData";

    function setFont(font: string | null): void {
        fontService.currentFont = font;
    }

    const fonts = ref((await FontService.getInstalledFonts()).filter(font => font.style === 'Regular'));
</script>

<template>
    <div>
        <transition-group>
            <draggable
                v-model="fonts"
                item-key="id"
                key="draggable"
                drag-class="dragging"
                ghost-class="ghost"
                animation="200"
                class="flex flex-col gap-1"
                :group="{name: 'font', pull: true, put: checkGroupMatch}"
                :disabled="true"
            >
                <template #header>
                    <font-card :font="fontService.defaultFont" :is-default="true" @click="setFont(null)"/>
                </template>

                <template #item="{element: font}: {element: FontData}">
                    <font-card :font="font.family" @click="setFont(font.family)"/>
                </template>
            </draggable>
        </transition-group>
    </div>
</template>