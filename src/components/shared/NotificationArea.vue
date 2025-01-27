<script setup lang="ts">
    import { useNotifications } from "@/composables/useNotifications";
    import NotificationCard from "@/components/shared/NotificationCard.vue";

    const {getNotifications} = useNotifications();

    const notifications = getNotifications();
</script>

<template>
    <div class="absolute inset-0 pointer-events-none overflow-clip flex flex-col-reverse items-end gap-2 p-6">
        <transition-group name="list">
            <notification-card
                v-for="notification in notifications"
                :notification="notification"
                :key="notification.id"
                class="pointer-events-auto"
            />
        </transition-group>
    </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped lang="postcss">
    .list-move, .list-enter-active, .list-leave-active {
        @apply transition-all duration-500;
    }

    .list-enter-from, .list-leave-to {
        @apply opacity-0;
    }

    .list-enter-from {
        @apply -translate-x-4;
    }

    .list-leave-to {
        @apply translate-x-4;
    }

    .list-leave-active {
        @apply absolute;
    }
</style>