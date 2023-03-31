import { useInfiniteQuery, useQuery, useMutation } from 'react-query';
import { HTTP } from '../../../core/http/HttpClient';
import {
  ApplicantOrderDetailsResponseProps,
  ApplicantOrdersResponseProps,
  ApplicantOrderStatusResponseProps
} from './ApplicantOrderService.types';

export const OrderService = () => {
  const useGetApplicantOrders = (
    serviceOrderStatus: string
  ) => useInfiniteQuery(
    ['/order/user', serviceOrderStatus], ({ pageParam = 0 }) => HTTP.client().get<ApplicantOrdersResponseProps>(`/order/user?serviceOrderUserStatus=${serviceOrderStatus}&pageSize=10&pageIndex=${pageParam}`),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.data) {
          const { totalPages, pageNumber } = lastPage.data.data;
          if (pageNumber < totalPages - 1) return pageNumber + 1;
        }
      }
    }
  );

  const getApplicantOrdersStatusCount = () => HTTP.client().get<ApplicantOrderStatusResponseProps>('/order/user/status-counts');

  const useGetApplicantOrdersStatusCount = () => useQuery(
    ['/order/user/status-counts'], getApplicantOrdersStatusCount
  );
  const getApplicantOrderDetails = ({ queryKey }: any) => HTTP.client().get<ApplicantOrderDetailsResponseProps>(`/order/user/${queryKey[1]}`);

  const useGetApplicantOrderDetails = (serviceOrderUserId: number) => useQuery(
    ['/order/user', serviceOrderUserId], getApplicantOrderDetails
  );

  const useAcceptOrderRequest = () => useMutation(acceptOrderRequest);
  const acceptOrderRequest = (serviceOrderUserId: number) => HTTP.client().put(`/order/user/accept/${serviceOrderUserId}`);

  const useDeclineOrderRequest = () => useMutation(declineOrderRequest);
  const declineOrderRequest = (serviceOrderUserId: number) => HTTP.client().put(`/order/user/decline/${serviceOrderUserId}`);

  const useFinishOrder = () => useMutation(finishOrder);
  const finishOrder = (serviceOrderUserId: number) => HTTP.client().put(`order/user/finish/${serviceOrderUserId}`);

  const useCancelOrder = () => useMutation(cancelOrder);
  const cancelOrder = (serviceOrderUserId: number) => HTTP.client().put(`order/user/cancel/${serviceOrderUserId}`);

  return {
    useGetApplicantOrders,
    useGetApplicantOrdersStatusCount,
    useGetApplicantOrderDetails,
    useAcceptOrderRequest,
    useDeclineOrderRequest,
    useFinishOrder,
    useCancelOrder
  };
};
