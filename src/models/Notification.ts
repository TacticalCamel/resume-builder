export interface Notification {
    id: string
    type: NotificationType
    duration: number
    title?: string
    message?: string
}

export type NotificationType = 'error' | 'warning' | 'success' | 'info'