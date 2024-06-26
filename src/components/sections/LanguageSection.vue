<script setup lang="ts">
    import type {LanguageSection} from "@/models/Language";
    import SectionTitle from "@/components/shared/SectionTitle.vue";
    import {inject, type PropType} from "vue";
    import EditText from "@/components/shared/EditText.vue";
    import IconDelete from "@/components/icons/IconDelete.vue";

    const model = defineModel({
        type: Object as PropType<LanguageSection>,
        required: true
    });

    const editable = inject<boolean>('isEditMode', false);

    function addLanguage() {
        model.value.languages.push({name: "", level: ""});
    }

    function deleteLanguage(index: number) {
        model.value.languages.splice(index, 1);
    }
</script>

<template>
    <div v-if="editable || model.languages.length">
        <section-title v-model="model.title" :display-warning="!model.languages.length" @on-add="addLanguage"/>
        <table class="m-2 me-0">
            <tbody>
                <tr v-for="(language, index) in model.languages" :key="language.name" class="delete-glow">
                    <td class="p-0 pe-16">
                        <edit-text v-model="language.name"/>
                    </td>
                    <td class="font-light p-0">
                        <edit-text v-model="language.level"/>
                    </td>
                    <td v-if="editable" class="p-0 ps-8 edit-controls">
                        <button @click="deleteLanguage(index)" class="bg-opacity-20 bg-red-500 text-red-500 px-4 py-0.5 rounded delete hover:bg-opacity-0 block">
                            <icon-delete class="size-5"/>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
    table{
        border-collapse: separate;
        border-spacing: 0 2px;
    }

    tr .edit-controls {
        display: none;
    }

    tr:hover .edit-controls {
        display: table-cell;
    }

    tr:has(.editable:focus-within) .edit-controls {
        display: none;
    }
</style>