<script setup lang="ts">
    const props = defineProps({
        value: {type: Number, required: true}
    });

    const barCount: number = 5;

    function getColor(i: number){
        const defaultColor = "bg-gray-700";

        if(i > props.value){
            return defaultColor;
        }

        switch (props.value) {
            case 5:
                return "bg-sky-500";
            case 4:
                return "bg-green-500";
            case 3:
                return "bg-[#95c714]";
            case 2:
                return "bg-yellow-500";
            case 1:
                return "bg-red-500";
            default:
                return defaultColor;
        }
    }
</script>

<template>
    <div class="flex items-center bg-neutral-900 px-[0.125rem] rounded-sm select-none shadow-sm shadow-black">
        <span v-for="i in barCount" :key="i" :class="`rounded-full w-[0.125em] h-[0.875em] m-[0.125em] ${getColor(i)}`">
            &nbsp;
        </span>
    </div>
</template>