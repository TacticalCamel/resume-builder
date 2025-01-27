import { shallowReadonly, ref, Ref } from "vue";
import { Notification, NotificationType } from "@/models/Notification";

/**
 * The list of currently active notifications.
 */
const notifications: Ref<Notification[]> = ref<Notification[]>([]);

/**
 * This composable handles interactions with notifications.
 */
export function useNotifications() {
    /**
     * Create and display a new notification.
     * @param type The type of the notification.
     * @param content The content of the notification.
     */
    function createNotification(type: NotificationType, content: Partial<Omit<Notification, 'id' & 'type'>>): void {
        // create a new notification with a random id
        const notification: Notification = {
            id: crypto.randomUUID(),
            type: type,
            duration: content.duration ?? 5000,
            actions: content.actions ?? [],
            title: content.title ?? type,
            message: content.message,
        };

        // show notification
        notifications.value.push(notification);

        // remove automatically after the provided duration
        setTimeout(removeNotification, notification.duration, notification.id);
    }

    /**
     * Remove a notification.
     * @param id The id of the notification to remove.
     */
    function removeNotification(id: string): void {
        // find notification by id
        const index: number = notifications.value.findIndex(n => n.id === id);

        // remove if present in the list, do nothing otherwise
        if (index >= 0) {
            notifications.value.splice(index, 1);
        }
    }

    /**
     * Get all notifications as a readonly list.
     */
    function getNotifications(): Readonly<Ref<Notification[]>> {
        return shallowReadonly(notifications);
    }

    return {
        getNotifications,
        createNotification,
        removeNotification
    }
}