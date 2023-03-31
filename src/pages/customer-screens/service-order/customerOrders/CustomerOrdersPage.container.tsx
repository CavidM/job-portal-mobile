import React, { useState } from 'react';
import { CustomerOrdersPage } from './CustomerOrdersPage';
import { OrderService } from '../../../../services/order-service/Customer/Order.service';
import { ServiceResponseWithPagination } from '../../../../services/service.types';
import {
  CustomerOrdersModel,
  CustomerOrdersResponseProps
} from '../../../../services/order-service/Customer/OrderService.types';

const orderService = OrderService();

const flatOrderList = (
  list: ServiceResponseWithPagination<CustomerOrdersResponseProps>[] | undefined
) => {
  const data: CustomerOrdersModel[] = [];

  list?.forEach((item) => {
    item.data?.data?.data?.forEach((order) => data.push(order));
  });

  return data;
};

export const CustomerOrdersContainer = () => {
  const [serviceOrderStatus, setServiceOrderStatus] = useState('');
  const {
    data: customerOrdersStatusData
  } = orderService.useGetCustomerOrdersStatusCount();

  const {
    data: customerOrdersData, isLoading, hasNextPage,
    fetchNextPage, refetch, isFetchingNextPage, isFetching
  } = orderService.useGetCustomerOrders(serviceOrderStatus);

  const onSelectStatus = (status: string) => {
    setServiceOrderStatus(status);
  };

  const orderList = flatOrderList(customerOrdersData?.pages);

  const onRefresh = () => {
    refetch();
  };

  const onScroll = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  return (
    <CustomerOrdersPage
      ordersData={orderList}
      ordersStatusData={customerOrdersStatusData?.data.data}
      onSelectStatus={onSelectStatus}
      onScroll={onScroll}
      isLoading={isLoading}
      isFetching={isFetching}
      onRefresh={onRefresh}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
    />
  );
};
