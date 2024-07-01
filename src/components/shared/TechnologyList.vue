<script setup lang="ts">
    import {inject} from "vue";
    import draggable from "vuedraggable";
    import type SettingsModel from "@/models/SettingsModel";
    import IconPlus from "@/components/icons/IconPlus.vue";
    import EditText from "@/components/shared/EditText.vue";

    // get the current settings
    const settings = inject<SettingsModel>('settings', {} as SettingsModel);

    // except a list of strings as a model
    const model = defineModel<string[]>({
        required: true
    });

    // delete an item from the list
    function deleteItem(index: number) {
        model.value.splice(index, 1);
    }

    // add a new empty item to the list
    function addItem() {
        model.value.push('');
    }
</script>

<template>
    <div class="technology-list">
        <transition-group>
            <draggable
                v-model="model"
                item-key="id"
                key="draggable"
                :disabled="!settings.editable"
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

                <template #footer v-if="settings.editable">
                    <button @click="addItem" class="px-1 rounded bg-green-500 bg-opacity-20 text-green-500 outline outline-transparent outline-1 hover:outline-green-500 transition-all add opacity-0">
                        <icon-plus class="size-5"/>
                    </button>
                </template>
            </draggable>
        </transition-group>
    </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .technology-list:hover .add {
        opacity: 1;
    }

    .technology-list:has(.editable:focus-within) .add {
        opacity: 0;
    }
</style>