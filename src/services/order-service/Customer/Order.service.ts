import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { HTTP } from '../../../core/http/HttpClient';
import { ServiceResponseProps, ServiceResponseWithPagination } from '../../service.types';
import {
  CreateOrderRequestProps,
  CustomerOrderDetailsResponseProps,
  CustomerOrdersResponseProps,
  CustomerOrderStatusResponseProps,
  GetOrderUsersBySearchParamsRequestProps,
  GetOrderUsersBySearchParamsResponseProps,
  ScheduledOrderProps
} from './OrderService.types';

export const OrderService = () => {
  const getOrderUsersBySearchParams = (
    payload: GetOrderUsersBySearchParamsRequestProps
  ) => HTTP.client().post<
      ServiceResponseProps<
        GetOrderUsersBySearchParamsResponseProps
        >
      >('/order/users', payload);

  const createOrder = (payload:CreateOrderRequestProps) => HTTP.client().post('/order', payload);
  const getCustomerOrdersStatusCount = () => HTTP.client().get <ServiceResponseProps<CustomerOrderStatusResponseProps[]>>('/order/status-counts');
  const getCustomerOrderDetails = ({ queryKey }: any) => HTTP.client().get <ServiceResponseProps<CustomerOrderDetailsResponseProps>>(`/order/my/${queryKey[1]}`);
  const createScheduledOrder = (payload: ScheduledOrderProps) => HTTP.client().post('/order/schedule', payload);

  const useGetOrderUsersBySearchParams = () => useMutation(getOrderUsersBySearchParams);
  const useCreateOrder = () => useMutation(createOrder);
  const useGetCustomerOrders = (
    serviceOrderStatus: string
  ) => useInfiniteQuery(
    ['/order/my', serviceOrderStatus], ({ pageParam = 0 }) => HTTP.client().get<
          ServiceResponseWithPagination<CustomerOrdersResponseProps[]>
          >(`/order/my?serviceOrderStatus=${serviceOrderStatus}&pageSize=10&pageIndex=${pageParam}`),
    {
      getNextPageParam: (lastPage) => {
        const { totalPages, pageNumber } = lastPage.data.data;
        if (pageNumber < totalPages - 1) return pageNumber + 1;
      }
    }
  );
  const useCreateScheduledOrder = () => useMutation(createScheduledOrder);

  const useGetCustomerOrdersStatusCount = () => useQuery(
    ['/order/status-counts'], getCustomerOrdersStatusCount
  );
  const useGetCustomerOrderDetails = (id: number) => useQuery(
    ['/order/my', id], getCustomerOrderDetails
  );

  const useCancelOrder = () => useMutation(cancelOrder);
  const cancelOrder = (serviceOrderUserId: number) => HTTP.client().put(`order/cancel/${serviceOrderUserId}`);

  return {
    useGetOrderUsersBySearchParams,
    useCreateOrder,
    useGetCustomerOrders,
    useGetCustomerOrdersStatusCount,
    useGetCustomerOrderDetails,
    useCreateScheduledOrder,
    useCancelOrder
  };
};
