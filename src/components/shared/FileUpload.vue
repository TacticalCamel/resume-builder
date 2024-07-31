<script setup lang="ts">
    const props = defineProps({
        id: {
            type: String,
            required: true
        },
        accept: {
            type: String,
            default: '*/*'
        },
        readDataUrl: {
            type: Boolean,
            default: false
        }
    });

    const emits = defineEmits({
        onUpload: (content: string) => content
    });

    // create a file reader
    const reader = new FileReader();

    // execute this function each time a file is read
    reader.onload = function () {
        // get the contents of the file
        const contentBuffer: string | ArrayBuffer | null = reader.result;

        // if no contents are found, return
        if (!contentBuffer) {
            return;
        }

        // success
        emits('onUpload', contentBuffer as string);
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

        // read as source
        if (props.readDataUrl) {
            reader.readAsDataURL(file);
        }

        // read as text
        else {
            reader.readAsText(file, 'UTF-8');
        }
    }
</script>

<template>
    <div>
        <label :for="id" class="block text-center">
            <slot/>
        </label>
        <input :id="id" type="file" @change="upload($event)" class="hidden" :accept="accept"/>
    </div>
</template>