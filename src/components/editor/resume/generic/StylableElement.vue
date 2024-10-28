<script setup lang="ts">
    const {idSelector, classSelector} = defineProps<{
        idSelector: string
        classSelector: string
    }>();

    const enabled = true;

    function onSelect(e: Event): void {
        if(!enabled) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        // select or unselect element
        console.log('clicked', '#' + idSelector, '.' + classSelector);
    }
</script>

<template>
    <div :class="classSelector" :id="idSelector" @click="onSelect">
        <slot/>
    </div>
</template>

<style scoped lang="postcss">

</style>