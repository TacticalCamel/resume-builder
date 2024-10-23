export interface Notification {
    id: string
    type: NotificationType
    duration: number
    actions: NotificationAction[]
    title: string
    message?: string
}

export interface NotificationAction {
    type?: NotificationType
    text: string
    onClick: () => void
}

export type NotificationType = 'error' | 'warning' | 'success' | 'info'