<script setup lang="ts">
    import IconLoading from "@/components/shared/IconLoading.vue";
    import IconWarning from "@/components/shared/IconWarning.vue";
    import IconCheck from "@/components/shared/IconCheck.vue";
    import { SaveState } from "@/composables/useAutosave";

    const {state, id} = defineProps<{
        state: SaveState,
        id: string
    }>();
</script>

<template>
    <div class="flex gap-2 items-center text-sm text-nowrap">
        <template v-if="state === SaveState.resolved">
            <icon-check class="size-5 text-secondary"/>
            <span class="text-secondary">Template saved</span>
        </template>

        <template v-else-if="state === SaveState.pending">
            <icon-loading class="size-5 text-foreground/70"/>
            <span class="text-foreground/70">Saving changes...</span>
        </template>

        <template v-else-if="state === SaveState.waiting">
            <icon-warning class="size-5 text-warning p-px"/>
            <span class="text-warning">Unsaved changes</span>
        </template>

        <span class="text-foreground/60 ms-auto font-mono text-[13px]">
            #{{ id.slice(0, 8) }}
        </span>
    </div>
</template>