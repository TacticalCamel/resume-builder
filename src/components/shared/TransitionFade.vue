<template>
    <transition name="fade" mode="out-in">
        <slot/>
    </transition>
</template>

<!--suppress CssUnusedSymbol -->
<style lang="postcss" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 150ms ease-in-out;
    }

    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
</style>