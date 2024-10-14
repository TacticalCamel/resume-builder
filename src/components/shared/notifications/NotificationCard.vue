<script setup lang="ts">
    import { computed } from "vue";
    import { Notification } from "@/models/Notification";
    import IconCheck from "@/components/shared/icons/IconCheck.vue";
    import IconWarning from "@/components/shared/icons/IconWarning.vue";
    import IconError from "@/components/shared/icons/IconError.vue";
    import IconInfo from "@/components/shared/icons/IconInfo.vue";

    const {notification} = defineProps<{
        notification: Notification
    }>();

    const icon = computed(() => {
        switch (notification.type) {
            case "success":
                return IconCheck;
            case "warning":
                return IconWarning;
            case "error":
                return IconError;
            case "info":
                return IconInfo;
        }
    });
</script>

<template>
    <div class="border-2 border-primary bg-background rounded-lg overflow-clip w-96 pointer-events-auto" :style="{'--primary': `var(--${notification.type})`}">
        <div class="flex gap-6 items-center px-4 py-2 bg-foreground/5">
            <component :is="icon" class="size-6 text-primary"/>

            <div class="grid gap-1">
                <div class="font-semibold uppercase">{{ notification.title ?? notification.type }}</div>
                <div v-if="notification.message" class="text-sm text-foreground/70">{{ notification.message }}</div>
            </div>

        </div>

        <div class="bg-foreground/5">
            <div class="timer h-1 bg-primary" :style="{animationDuration: `${notification.duration}ms`}"/>
        </div>
    </div>
</template>

<style scoped lang="postcss">
    @keyframes shrink-width {
        from {
            width: 100%;
        }

        to {
            width: 0;
        }
    }

    .timer {
        animation-name: shrink-width;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
    }
</style>