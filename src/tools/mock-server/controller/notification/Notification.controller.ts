import { Request, Response } from 'miragejs';
import Schema from 'miragejs/orm/schema';
import { NotificationItemMock } from './Notification.data';

export const getNotifications = (schema: Schema, request: Request) => {
  const { pageIndex, pageSize } = request.queryParams;

  const notifications = [];

  for (let i = 0; i < parseInt(pageSize, 10); i++) {
    notifications.push(NotificationItemMock(i % 2 ? 'READ' : 'UNREAD'));
  }

  return new Response(200, {}, {
    message: null,
    data: {
      data: notifications,
      pageSize: parseInt(pageSize, 10),
      pageNumber: parseInt(pageIndex, 10),
      numberOfElements: 1,
      totalPages: 3,
      totalElements: 1
    },
    timestamp: '09.09.2021 12:12:06',
    subErrors: null
  });
};

export const markAsReadNotification = () => new Response(200);
