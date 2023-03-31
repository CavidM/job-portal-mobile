import React, { useState } from 'react';
import { ApplicantOrdersPage } from './ApplicantOrdersPage';
import { OrderService } from '../../../services/order-service/Applicant/ApplicantOrder.service';
import { ServiceResponseWithPagination } from '../../../services/service.types';
import {
  ApplicantOrdersModel,
  ApplicantOrdersResponseProps
} from '../../../services/order-service/Applicant/ApplicantOrderService.types';

const orderService = OrderService();

const flatOrderList = (
  list: ServiceResponseWithPagination<ApplicantOrdersResponseProps>[] | undefined
) => {
  const data: ApplicantOrdersModel[] = [];

  list?.forEach((item) => {
    item.data?.data?.data?.forEach((order: ApplicantOrdersModel) => data.push(order));
  });

  return data;
};
export const ApplicantOrdersContainer = () => {
  const [serviceOrderStatus, setServiceOrderStatus] = useState('');
  const {
    data: ApplicantOrdersStatusData, refetch: reFetchStatuses
  } = orderService.useGetApplicantOrdersStatusCount();

  const {
    data: applicantOrdersData, isLoading,
    fetchNextPage, refetch, isFetchingNextPage, isFetching, hasNextPage
  } = orderService.useGetApplicantOrders(serviceOrderStatus);

  const onSelectStatus = (status: string) => {
    setServiceOrderStatus(status);
  };

  const onRefresh = () => {
    refetch();
    reFetchStatuses();
  };
  const onScroll = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const orderList = flatOrderList(applicantOrdersData?.pages);

  return (
    <ApplicantOrdersPage
      ordersData={orderList}
      onSelectStatus={onSelectStatus}
      onScroll={onScroll}
      isLoading={isLoading}
      isFetching={isFetching}
      ordersStatusData={ApplicantOrdersStatusData?.data.data}
      isFetchingNextPage={isFetchingNextPage}
      onRefresh={onRefresh}
      hasNextPage={hasNextPage}
    />
  );
};
