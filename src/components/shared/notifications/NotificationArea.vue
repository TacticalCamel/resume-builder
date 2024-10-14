<script setup lang="ts">
    import { useNotifications } from "@/composables/useNotifications";
    import Notification from "@/components/shared/notifications/NotificationCard.vue";

    const {notifications} = useNotifications();
</script>

<template>
    <div class="absolute right-0 bottom-0 overflow-clip pointer-events-none">
        <transition-group name="list" tag="div" class="relative flex flex-col-reverse gap-2 pb-6 pe-6">
            <notification
                v-for="notification in notifications"
                :notification="notification"
                :key="notification.id"
            />
        </transition-group>
    </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped lang="postcss">
    .list-move, .list-enter-active, .list-leave-active {
        transition: all 500ms ease;
    }

    /*.list-move, .list-enter-active, .list-leave-active {
        transition: all 1.5s ease;
    }

    .list-enter-from, .list-leave-to {
        opacity: 0;
        transform: translateX(1rem);
    }

    .list-leave-active {
        position: absolute;
    }*/
</style>