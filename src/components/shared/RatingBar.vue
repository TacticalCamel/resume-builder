<script setup lang="ts">
    const props = defineProps({
        value: {type: Number, required: true}
    });

    const barCount: number = 5;

    function getColor(i: number) {
        if (i > props.value || 0 > i) {
            return 0;
        }

        if(i > barCount){
            return barCount;
        }

        return props.value;
    }
</script>

<template>
    <div class="flex items-center bg-darker rounded-sm select-none shadow-sm shadow-black">
        <span v-for="i in barCount" :key="i" class="rating-bar" :class="`rating-bar-${getColor(i)}`">
            &nbsp;
        </span>
    </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .rating-bar{
        margin: 0.0625em 0.1875em 0.0625em 0;
        width: 0.125em;
        height: 0.875em;
        border-radius: 9999px;
    }

    .rating-bar:first-child{
        margin-left: 0.1875em;
    }

    .rating-bar-0{
        background-color: var(--rating-bar-0);
    }

    .rating-bar-1{
        background-color: var(--rating-bar-1);
    }

    .rating-bar-2{
        background-color: var(--rating-bar-2);
    }

    .rating-bar-3{
        background-color: var(--rating-bar-3);
    }

    .rating-bar-4{
        background-color: var(--rating-bar-4);
    }

    .rating-bar-5{
        background-color: var(--rating-bar-5);
    }

    .bg-darker{
        background-color: var(--neutral-dark);
    }
</style>