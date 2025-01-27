import { Ref } from "vue";
import { UniqueId } from "@/models/UniqueId";

export interface Notification extends UniqueId {
    type: NotificationType
    duration: number
    actions: NotificationAction[]
    title: string
    message?: string
}

export interface NotificationAction {
    type?: NotificationType
    text: string
    onClick: (notification: Notification) => void
}

export type NotificationType = 'error' | 'warning' | 'success' | 'info';

export type NotificationContent = Partial<Omit<Notification, 'id' & 'type'>>;

export interface NotificationManager {
    createNotification: (type: NotificationType, content: NotificationContent) => void,
    removeNotification: (id: string) => void,
    getNotifications: () => Readonly<Ref<Notification[]>>
}