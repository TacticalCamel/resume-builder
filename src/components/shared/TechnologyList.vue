<script setup lang="ts">
    import {inject} from "vue";
    import draggable from "vuedraggable";
    import type SettingsModel from "@/models/SettingsModel";
    import EditText from "@/components/shared/EditText.vue";
    import {checkGroupMatch} from "@/models/BuildingBlock";

    // get the current settings
    const settings = inject<SettingsModel>('settings', {} as SettingsModel);

    // except a list of strings as a model
    const model = defineModel<string[]>({
        required: true
    });
</script>

<template>
    <div class="technology-list">
        <transition-group>
            <draggable
                v-model="model"
                item-key="id"
                key="draggable"
                :disabled="!settings.editable"
                :group="{name: 'technology', pull: true, put: checkGroupMatch}"
                drag-class="dragging"
                ghost-class="ghost"
                animation="200"
                class="flex flex-wrap gap-2 mb-0.5"
            >
                <template #item="{index}: {index: number}">
                    <div class="flex relative">
                        <span class="px-1 technology-card rounded bg-accent text-sm shadow-sm shadow-[#000000bb] transition-all text-nowrap">
                            <edit-text v-model="model[index]"/>
                        </span>
                    </div>
                </template>
            </draggable>
        </transition-group>
    </div>
</template>