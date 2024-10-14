import { readonly, ref, Ref } from "vue";
import { Notification, NotificationType } from "@/models/Notification";

// use a global state for all notifications
const notifications: Ref<Notification[]> = ref<Notification[]>([]);

/**
 * This composable provides a way to display notifications.
 * Notifications are shown for their duration and then removed automatically.
 */
export function useNotifications() {
    function displayNotification(type: NotificationType, content: Partial<Omit<Notification, 'id' & 'type'>>): void {
        // create a new notification with a random id
        const notification: Notification = {
            id: crypto.randomUUID(),
            type: type,
            title: content.title,
            message: content.message,
            duration: content.duration ?? 5000
        };

        // add to the global list
        notifications.value.push(notification);

        // remove after the given duration
        setTimeout(() => remove(notification.id), notification.duration);
    }

    function remove(id: string): void {
        const index: number = notifications.value.findIndex(n => n.id === id);

        if (index >= 0) {
            notifications.value.splice(index, 1);
        }
    }

    return {
        notifications: readonly(notifications),
        displayNotification
    }
}