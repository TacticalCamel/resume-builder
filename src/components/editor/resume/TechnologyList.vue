<script setup lang="ts">
    import { inject } from "vue";
    import draggable from "vuedraggable";
    import InputText from "@/components/shared/InputText.vue";
    import {checkGroupMatch} from "@/models/BuildingBlock";

    // except a list of strings as a model
    const model = defineModel<string[]>({
        required: true
    });

    const editable = inject<boolean>('editable', false);
</script>

<template>
    <div>
        <transition-group>
            <draggable
                v-model="model"
                item-key="id"
                key="draggable"
                :disabled="!editable"
                :group="{name: 'technology', pull: true, put: checkGroupMatch}"
                drag-class="dragging"
                ghost-class="ghost"
                animation="200"
                class="flex flex-wrap gap-2 text-sm items-start"
            >
                <template #item="{index}: {index: number}">
                    <div class="flex relative">
                        <span class="px-1 rounded bg-primary font-semibold shadow-sm shadow-[#000000bb] transition-all text-nowrap">
                            <input-text v-model="model[index]" placeholder="Technology"/>
                        </span>
                    </div>
                </template>
            </draggable>
        </transition-group>
    </div>
</template>