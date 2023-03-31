import {
  NotificationStatus,
  NotificationTypes
} from '../../services/notification-service/NotificationService.types';

export interface NotificationPayload {
  content: string
  title: string
  notificationType: NotificationTypes
  entity: unknown
  notificationState: NotificationStatus
  |
  { [key: string]: unknown };
}
