import { GetOrderUsersBySearchParamsRequestProps } from '../order-service/Customer/OrderService.types';

export type NotificationTypes =
  'TEST' |
  'SCHEDULED_ORDER_SEARCH_USER_FOUND' |
  'SCHEDULED_ORDER_SEARCH_USER_NOT_FOUND' |
  'ORDER_USERS_ALREADY_FOUND' |
  'ORDER_REQUEST_SENT'|
  'ORDER_REQUEST_ACCEPTED' |
  'ORDER_REQUEST_DECLINED' |
  'ORDER_CANCELLED'|
  'SCHEDULED_NOTIFICATION'|
  'SCHEDULED_QUESTIONNAIRE'|
  'SERVICE_ORDER_QUESTIONNAIRE'|
  'SERVICE_ORDER_QUESTIONNAIRE_WHEN_WORK_CANCELLED_FROM_B' |
  'SERVICE_ORDER_QUESTIONNAIRE_WHEN_WORK_FINISHED_FROM_B'|
  'SERVICE_ORDER_QUESTIONNAIRE_WHEN_WORK_CANCELLED_FROM_C'

export type NotificationStatus = 'READ' | 'UNREAD'

export interface NotificationItemProps {
  content: string,
  createdDate: string,
  entity: GetOrderUsersBySearchParamsRequestProps,
  id: number,
  notificationState: NotificationStatus,
  notificationType: NotificationTypes,
  title: string
}
