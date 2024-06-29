<script setup lang="ts">
    import {inject} from "vue";
    import type SettingsModel from "@/models/SettingsModel";
    import EditText from "@/components/shared/EditText.vue";
    import IconListAdd from "@/components/icons/IconAdd.vue";
    import IconInfo from "@/components/icons/IconInfo.vue";

    const settings = inject<SettingsModel>('settings', {} as SettingsModel);

    defineEmits(['onAdd']);

    const title = defineModel({
        type: String,
        required: true
    });

    defineProps({
        displayWarning: {
            type: Boolean,
            default: false
        }
    });
</script>

<template>
    <div class="flex flex-col items-start">
        <div :class="{'section-title': settings.editable}" class="flex outline-transparent items-center">
            <edit-text v-model="title" class="uppercase text-2xl"/>
            <button v-if="settings.editable" @click="$emit('onAdd')" class="ms-8 hover:ms-0 ps-4 hover:ps-12 text-green-500 pe-4 py-0.5 rounded bg-opacity-20 bg-green-500 hover:bg-opacity-0">
                <icon-list-add class="size-5"/>
            </button>
        </div>
        <div v-if="settings.editable && displayWarning" class="flex items-center text-cyan-500 mt-4 bg-cyan-500 bg-opacity-20 px-2 py-1 rounded">
            <icon-info class="size-6 me-2"/>
            <span>Empty section will not be displayed</span>
        </div>
    </div>
</template>

<style scoped>
    .section-title:has(button:hover){
        outline: 1px solid rgb(34, 197, 94);
        border-radius: 0.25em;
        background-color: rgba(34, 197, 94, 0.2);
        transition: color, background-color, outline-color 150ms;
        align-items: stretch;
    }

    .section-title > button{
        opacity: 0;
    }

    .section-title:hover > button{
        opacity: 1;
        transition: opacity 150ms;
    }

    .section-title:has(.editable:focus-within) > button{
        display: none;
    }
</style>