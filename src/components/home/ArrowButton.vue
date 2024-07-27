<template>
    <button class="arrow-button flex items-center gap-1 ps-6 pe-3 py-1.5 bg-primary transition-all rounded-lg font-medium select-none">
        <span v-if="$slots.default">
            <slot/>
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" class="size-5 mt-px">
            <path class="arrow-tip" d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
            <path class="arrow-line" d="M200-440v-80h400v80H200Z"/>
        </svg>
    </button>
</template>

<style lang="postcss" scoped>
    .arrow-line, .arrow-tip {
        @apply transition-all;
    }

    .arrow-button:hover .arrow-tip {
        transform: translateX(100px);
    }

    .arrow-button .arrow-line {
        opacity: 0;
    }

    .arrow-button:hover .arrow-line {
        opacity: 1;
    }

    .arrow-button:hover {
        box-shadow: 0 0 1.5rem 0.5rem rgb(var(--primary) / 0.5);
    }
</style>