<script setup lang="ts">
    import FileUpload from "@/components/shared/FileUpload.vue";
    import type Template from "@/models/Template";
    import {onMounted, type PropType, watch} from "vue";
    import ToggleSwitch from "@/components/shared/ToggleSwitch.vue";

    // model for the template
    const template = defineModel('template', {
        type: Object as PropType<Template | null>,
        required: true
    })

    // model for toggling edit mode
    const isEditMode = defineModel('isEditMode', {
        type: Boolean,
        required: true
    })

    // handle model loading from local storage
    onMounted(() => {
        // load the template from local storage
        const templateValue: string | null = localStorage.getItem('template');

        if (templateValue != null) {
            template.value = JSON.parse(templateValue);
        }
    });

    // watch for changes in the template
    watch(template, (value) => {
        if (value) {
            localStorage.setItem('template', JSON.stringify(value));
        }
        else{
            localStorage.removeItem('template');
        }
    }, {deep: true});

    // import a cv template from a JSON file
    function importTemplate(contents: string) {
        template.value = JSON.parse(contents);
    }

    // export the current cv template as a JSON file
    function exportTemplate() {
        // get the JSON content
        const content = JSON.stringify(template.value, null, 4);

        // create a blob from the content
        const blob = new Blob([content], {type: 'application/json'});

        // create a URL for the blob
        const url = URL.createObjectURL(blob);

        // create a link and click it to download the file
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cv.json';
        a.click();

        // revoke the url
        URL.revokeObjectURL(url);
    }

    // delete the template
    function resetTemplate() {
        template.value = null;
    }
</script>

<template>
    <div class="grid grid-cols-2 gap-6">
        <div>Edit mode</div>
        <div class="px-2">
            <toggle-switch v-model="isEditMode"/>
        </div>

        <div>Profile</div>
        <div class="grid gap-3 text-sm">
            <file-upload @on-upload="importTemplate" id="cv-data" accept=".json" class="rounded font-semibold text-violet-500 hover:bg-violet-500 hover:bg-opacity-20 text-nowrap px-2 py-0.5 border border-violet-500 border-opacity-50 font-mono hover:transition-colors">
                Import template
            </file-upload>
            <button @click="exportTemplate" class="rounded font-semibold text-violet-500 hover:bg-violet-500 hover:bg-opacity-20 text-nowrap px-2 py-0.5 border border-violet-500 border-opacity-50 font-mono hover:transition-colors text-center">
                Export template
            </button>
            <button @click="resetTemplate" class="rounded font-semibold text-red-500 hover:bg-red-500 hover:bg-opacity-20 text-nowrap px-2 py-0.5 border border-red-500 border-opacity-50 font-mono hover:transition-colors text-center">
                Reset template
            </button>
        </div>
    </div>
</template>