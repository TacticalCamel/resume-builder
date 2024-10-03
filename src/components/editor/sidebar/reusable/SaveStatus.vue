<script setup lang="ts">
    import { SaveState } from "@/models/SaveState";
    import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";
    import IconWarning from "@/components/shared/icons/IconWarning.vue";
    import IconCheck from "@/components/shared/icons/IconCheck.vue";

    const {state, id} = defineProps<{
        state: SaveState,
        id: string
    }>();
</script>

<template>
    <div class="px-2 py-0.5 flex gap-2 items-center text-sm text-nowrap">
        <template v-if="state === SaveState.resolved">
            <icon-check class="size-5 text-secondary"/>
            <span class="text-secondary">Template saved</span>
        </template>

        <template v-else-if="state === SaveState.pending">
            <loading-spinner class="size-5 text-foreground/70"/>
            <span class="text-foreground/70">Saving changes...</span>
        </template>

        <template v-else-if="state === SaveState.waiting">
            <icon-warning class="size-5 text-warning p-px"/>
            <span class="text-warning">Unsaved changes</span>
        </template>

        <span class="text-foreground/60 ms-auto font-mono text-[13px]">
            id={{ id.slice(0, 8) }}
        </span>
    </div>
</template>