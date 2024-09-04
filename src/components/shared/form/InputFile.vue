<script setup lang="ts">
    import { ref, useTemplateRef } from "vue";

    const {accept, multiple, format = 'text'} = defineProps<{
        // the file types to accept in the upload dialog
        accept?: string

        // whether to allow multiple files to be uploaded
        multiple?: boolean

        // the data format to return
        format?: 'text' | 'binary' | 'base64'
    }>();

    const emits = defineEmits<{
        upload: [fileContent: string | ArrayBuffer, fileName: string]
    }>();

    const isDragging = ref<boolean>(false);

    const input = useTemplateRef<HTMLInputElement>('input');

    // handle upload by file upload dialog
    function uploadByDialog(event: Event) {
        // get the target element
        const target: HTMLInputElement = event.target as HTMLInputElement;

        // get the file list
        const files: FileList | null = target.files;

        // if no file is selected, return
        if (!files) {
            return;
        }

        // upload all selected files
        for (let i = 0; i < files.length; i++) {
            uploadFile(files[i]);
        }
    }

    // handle upload by drag and drop
    function uploadByDrop(event: DragEvent) {
        // get the file list
        const files: FileList | undefined = event.dataTransfer?.files;

        // if no file is selected, return
        if (!files) {
            return;
        }

        // upload all selected files
        for (let i = 0; i < files.length; i++) {
            uploadFile(files[i]);
        }
    }

    // common upload function to handle file reading
    function uploadFile(file: File) {
        // create a file reader
        const reader = new FileReader();

        // get the file name
        const fileName = file.name;

        // set the onload event
        reader.onload = function () {
            // get the contents of the file
            const content: string | ArrayBuffer | null = reader.result;

            // if no contents are found, return
            if (!content) {
                return;
            }

            // success
            emits('upload', content, fileName);
        }

        // read as binary
        if (format === 'binary') {
            reader.readAsArrayBuffer(file);
        }

        // read as base64
        else if (format === 'base64') {
            reader.readAsDataURL(file);
        }

        // read as text
        else if (format === 'text') {
            reader.readAsText(file, 'UTF-8');
        }

        // reset input value
        if (input.value) {
            input.value.value = '';
        }
    }
</script>

<template>
    <label
        @drop.prevent.stop="uploadByDrop"
        @dragover.prevent
        @dragenter="isDragging = true"
        @dragleave="isDragging = false"
        class="group"
        :class="{'dragover': isDragging}"
    >
        <input ref="input" type="file" @change="uploadByDialog" class="hidden" :accept="accept" :multiple="multiple"/>
        <span class="block pointer-events-none">
            <slot/>
        </span>
    </label>
</template>