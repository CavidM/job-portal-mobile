import { NotificationItemProps } from '../../../../services/notification-service/NotificationService.types';
import { generateRandomInteger } from '../../../uuid';

export const NotificationItemMock = (status: 'READ' | 'UNREAD' = 'UNREAD'): NotificationItemProps => ({
  id: generateRandomInteger(),
  title: 'e-Birja',
  content: 'Axtardığınız Çilingər peşəsi üzrə 3 istifadəçi tapıldı',
  entity: {
    countOfPerson: 2,
    jobDescription: 'Scheduled job search test',
    userSearchPayload: {
      authorityName: 'B',
      professionId: 3,
      specificationId: 9,
      cityId: 1,
      minSalary: null,
      genderType: 'MALE',
      minAge: 18,
      maxAge: 99,
      experience: null,
      pageSize: 2147483647,
      pageIndex: 1
    }
  },
  notificationType: 'SCHEDULED_ORDER_SEARCH_USER_FOUND',
  notificationState: status,
  createdDate: '2021-09-07T03:48:12.230339'
});
