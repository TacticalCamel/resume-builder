import { readonly, ref, Ref } from "vue";
import { Notification, NotificationType } from "@/models/Notification";

// use a global state for all notifications
const notifications: Ref<Notification[]> = ref<Notification[]>([]);

/**
 * This composable provides a way to display notifications.
 * Notifications are shown for their duration and then removed automatically.
 */
export function useNotifications() {
    const defaultDuration: number = 4000;

    function displayNotification(type: NotificationType, content: Partial<Omit<Notification, 'id' & 'type'>>): void {
        // create a new notification with a random id
        const notification: Notification = {
            id: crypto.randomUUID(),
            type: type,
            duration: content.duration ?? defaultDuration,
            actions: content.actions ?? [],
            title: content.title ?? type,
            message: content.message,
        };

        // add to the global list
        notifications.value.push(notification);

        // remove after the given duration
        setTimeout(() => removeNotification(notification.id), notification.duration);
    }

    function removeNotification(id: string): void {
        const index: number = notifications.value.findIndex(n => n.id === id);

        if (index >= 0) {
            notifications.value.splice(index, 1);
        }
    }

    return {
        notifications: readonly(notifications),
        displayNotification,
        removeNotification
    }
}