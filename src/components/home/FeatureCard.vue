<template>
    <div class="p-0.5 w-80">
        <div class="px-4 py-2 rounded h-full">
            <div class="font-bold text-xl mb-2">
                <slot name="title"/>
            </div>
            <div class="text-foreground/70">
                <slot name="content"/>
            </div>
        </div>
    </div>
</template>