<script setup lang="ts">
    import { PropType } from "vue";

    const props = defineProps({
        // the file types to accept in the upload dialog
        accept: {
            type: String,
            default: '*/*'
        },
        // the data format to return
        format: {
            type: String as PropType<'text' | 'binary' | 'base64'>,
            default: 'text'
        }
    });

    const emits = defineEmits<{
        onUpload: [content: string | ArrayBuffer, fileName: string]
    }>();

    // create a file reader
    const reader = new FileReader();

    // the name of the file being read
    let fileName = '';

    // execute this function each time a file is read
    reader.onload = function () {
        // get the contents of the file
        const content: string | ArrayBuffer | null = reader.result;

        // if no contents are found, return
        if (!content) {
            return;
        }

        // success
        emits('onUpload', content, fileName);
    }

    // handle a file upload event
    function upload(event: Event) {
        // get the target element
        const target: HTMLInputElement = event.target as HTMLInputElement;

        // if no file is selected, return
        if (!target.files || !target.files[0]) {
            return;
        }

        // get the uploaded file
        const file: File = target.files[0];

        // set the file name
        fileName = file.name;

        // read as binary
        if (props.format === 'binary') {
            reader.readAsArrayBuffer(file);
        }

        // read as base64
        else if (props.format === 'base64') {
            reader.readAsDataURL(file);
        }

        // read as text
        else if (props.format === 'text') {
            reader.readAsText(file, 'UTF-8');
        }
    }
</script>

<template>
    <label class="block text-center">
        <input type="file" @change="upload" class="hidden" :accept="accept"/>
        <slot/>
    </label>
</template>