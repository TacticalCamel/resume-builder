<script setup lang="ts">
    import {onMounted} from "vue";

    const emits = defineEmits({
        onSuccess: (content: string) => content,
        onError: (message: string) => message,
    });

    const props = defineProps({
        id: {
            type: String,
            required: true
        },
        accept: {
            type: String,
            default: '*/*'
        },
        readSrc: {
            type: Boolean,
            default: false
        }
    });

    // the key to use for storing the file in local storage
    const localStorageKey: string = `file-cache-${props.id ?? 'default'}`;

    // create a file reader
    const reader = new FileReader();

    // execute this function each time a file is read
    reader.onload = function () {
        // get the contents of the file
        const contentBuffer: string | ArrayBuffer | null = reader.result;

        // if no contents are found, return
        if (!contentBuffer) {
            emits('onError', 'File is empty');
            return;
        }

        const content: string = contentBuffer as string;

        // success
        emits('onSuccess', content);

        // save the result to local storage
        localStorage.setItem(localStorageKey, content);
    }

    onMounted(() => {
        // get the contents of the file from local storage
        const content: string | null = localStorage.getItem(localStorageKey);

        // if the file is found, emit the success event
        if(content) {
            emits('onSuccess', content);
        }
    });

    function upload(event: Event) {
        // get the target element
        const target: HTMLInputElement = event.target as HTMLInputElement;

        // if no file is selected, return
        if (!target.files || !target.files[0]) {
            emits('onError', 'No file is selected');
            return;
        }

        // get the uploaded file
        const file: File = target.files[0];

        // read as source
        if(props.readSrc){
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
        <label :for="id" class="block rounded font-semibold text-violet-500 transition-colors hover:bg-violet-500 hover:bg-opacity-20 text-nowrap py-1 px-2 border border-violet-500 border-opacity-50 font-mono">
            <span class="block text-center">
                <slot/>
            </span>
        </label>
        <input :id="id" type="file" @change="upload($event)" class="hidden" :accept="accept"/>
    </div>
</template>