<script setup lang="ts">
    import { EditorTabInfo } from "@/models/bindings/EditorTabInfo";

    const activeTab = defineModel<number>({
        required: true
    });

    const {tabs} = defineProps<{
        tabs: EditorTabInfo[]
    }>();
</script>

<template>
    <div class="relative flex flex-col overflow-clip bg-black/40">
        <button
            v-for="(tab, index) in tabs"
            @click="activeTab = index"
            class="flex flex-col items-center justify-center gap-1 size-[72px] transition-colors z-10"
            :class="{'text-secondary': index === activeTab }"
        >
            <component :is="tab.icon" class="size-6"/>
            <span class="text-xs">{{ tab.name }}</span>
        </button>

        <span class="absolute w-full h-[88px] bg-background pointer-events-none transition-all" :style="{top: `${-8 + activeTab * 72}px`}">
            <span class="side-cover -bottom-2"/>
            <span class="side-cover -top-2"/>
        </span>
    </div>
</template>

<style scoped lang="postcss">
    .side-cover {
        @apply absolute w-full h-4 rounded-e-full bg-background;

        &:after {
            @apply content-[''] absolute inset-0 bg-black/40 rounded-e-full;
        }
    }
</style>