import { useInfiniteQuery, useMutation } from 'react-query';
import { HTTP } from '../../core/http/HttpClient';
import { ServiceResponseWithPagination } from '../service.types';
import { NotificationItemProps } from './NotificationService.types';

export const NotificationService = () => {
  const getNotifications = async (
    { pageParam = 0 }
  ) => {
    try {
      const res = await HTTP
        .client()
        .get<
          ServiceResponseWithPagination<NotificationItemProps[]>
          >('/notifications', {
            params: {
              pageIndex: pageParam,
              pageSize: 10
            }
          });

      return res.data;
    } catch (e) {
      throw new Error(e);
    }
  };

  const markAsReadNotification = (id: number) => HTTP.client().put(`/notifications/mark-as-read/${id}`);

  const useGetNotifications = (userToken?: boolean) => useInfiniteQuery('get-notifications', getNotifications, {
    enabled: userToken,
    getNextPageParam: (lastPage) => {
      const { totalPages, pageNumber } = lastPage.data;
      if (pageNumber < totalPages - 1) return pageNumber + 1;
    }
  });

  const useMaskAsReadNotification = () => useMutation(markAsReadNotification);

  return {
    useGetNotifications,
    useMaskAsReadNotification
  };
};
