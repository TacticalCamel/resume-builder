<template>
    <section class="flex gap-16">
        <h1 v-if="$slots.title" class="text-7xl text-nowrap pb-[0.25em]">
            <slot name="title"/>
        </h1>
        <div class="grid gap-8 relative mt-5">
            <h2 v-if="$slots.subtitle" class="text-xl text-foreground/70">
                <slot name="subtitle"/>
            </h2>
            <div v-if="$slots.actions" class="flex gap-8 items-center text-nowrap">
                <slot name="actions"/>
            </div>
        </div>
    </section>
</template>