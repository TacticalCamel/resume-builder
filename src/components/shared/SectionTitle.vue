<script setup lang="ts">
    import IconWarning from "@/components/icons/IconWarning.vue";
    import EditText from "@/components/shared/EditText.vue";
    import IconListAdd from "@/components/icons/IconAdd.vue";
    import {inject} from "vue";

    const editable = inject<boolean>('isEditMode', false);

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
    <div class="flex md:items-center flex-col md:flex-row">
        <div class="flex outline-transparent items-center me-4">
            <edit-text v-model="title" class="uppercase text-2xl"/>
            <button v-if="editable" @click="$emit('onAdd')" class="ms-8 me-4 text-green-500 bg-opacity-20 bg-green-500 px-4 py-0.5 rounded hover:bg-opacity-0">
                <icon-list-add class="size-5"/>
            </button>
        </div>
        <div v-if="editable && displayWarning" class="flex items-center text-amber-500 mt-4 md:mt-0">
            <icon-warning class="size-6 me-2"/>
            <span>Empty section will not be displayed</span>
        </div>
    </div>
</template>

<style scoped>
    div:has(> button:hover){
        outline: 1px solid rgb(34, 197, 94);
        border-radius: 0.25em;
        background-color: rgba(34, 197, 94, 0.2);
        transition: color, background-color, outline-color 150ms;
        align-items: stretch;
    }
</style>