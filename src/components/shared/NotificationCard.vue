<script setup lang="ts">
    import { computed } from "vue";
    import { useNotifications } from "@/composables/useNotifications";
    import { Notification, NotificationType } from "@/models/Notification";
    import IconCheck from "@/components/shared/IconCheck.vue";
    import IconWarning from "@/components/shared/IconWarning.vue";
    import IconError from "@/components/shared/IconError.vue";
    import IconInfo from "@/components/shared/IconInfo.vue";
    import IconClose from "@/components/shared/IconClose.vue";

    const {notification} = defineProps<{
        notification: Notification
    }>();

    const {removeNotification} = useNotifications();

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

    function getColorStyle(type?: NotificationType) {
        return {
            '--primary': `var(--${type ?? 'foreground'})`
        };
    }
</script>

<template>
    <div class="relative border border-primary bg-background rounded-lg overflow-clip w-96" :style="getColorStyle(notification.type)">
        <div class="bg-foreground/5">
            <!-- content -->
            <div class="flex gap-6 items-center px-4 py-2">
                <component :is="icon" class="size-8 text-primary"/>

                <div class="grow grid gap-1">
                    <span class="font-semibold uppercase">{{ notification.title ?? notification.type }}</span>
                    <span v-if="notification.message" class="text-sm text-foreground/70">{{ notification.message }}</span>
                </div>
            </div>

            <!-- actions -->
            <div v-if="notification.actions.length" class="px-6 pt-2 pb-3 flex gap-6 text-sm">
                <button
                    v-for="action in notification.actions"
                    @click="action.onClick(notification)"
                    :style="getColorStyle(action.type)"
                    class="text-primary border border-primary px-2 py-0.5 rounded min-w-28 hover:bg-primary/20 transition-colors"
                >
                    {{ action.text }}
                </button>
            </div>

            <!-- timer bar -->
            <div class="timer h-1 bg-primary" :style="{animationDuration: `${notification.duration}ms`}"/>
        </div>

        <!-- close button -->
        <button class="absolute top-0 right-0 p-2 hover:text-error transition-colors" @click="removeNotification(notification.id)">
            <icon-close class="size-5"/>
        </button>
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