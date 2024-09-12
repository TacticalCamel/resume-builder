<template>
    <div class="p-0.5 w-80">
        <div class="px-4 py-2 rounded h-full">
            <div class="font-semibold text-xl text-secondary mb-2">
                <slot name="title"/>
            </div>
            <div class="text-foreground">
                <slot name="content"/>
            </div>
        </div>
    </div>
</template>