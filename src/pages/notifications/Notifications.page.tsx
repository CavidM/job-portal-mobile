import {
  Box, FlatList, Text, useToast, View
} from 'native-base';
import React, {useEffect} from 'react';
import { NotificationItemSeparator } from '../../components/Notification/NotificationItemSeparator';
import { useNotificationStyles } from '../../components/Notification/Notification.style';
import { NotificationService } from '../../services/notification-service/Notification.service';
import Loader from '../../components/Loader/Loader';
import { ServiceResponseWithPagination } from '../../services/service.types';
import { NotificationItemProps } from '../../services/notification-service/NotificationService.types';
import { NotificationItemContainer } from './NotificationItem.container';
import {useDispatch} from "react-redux";
import {saveNotificationsToRedux} from "../../store/slices/notifications.slice";

export const flatNotificationList = (
  list: undefined | ServiceResponseWithPagination<NotificationItemProps[]>[]
) => {
  const data: NotificationItemProps[] = [];

  list?.forEach((item) => {
    item.data.data.forEach((notification) => data.push(notification));
  });

  return data;
};

export const NotificationsPage = () => {
  const notificationStyle = useNotificationStyles();
  const notificationService = NotificationService();
  const toast = useToast();
  const dispatch = useDispatch()

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch
  } = notificationService.useGetNotifications();

  useEffect(()=>{
    dispatch(saveNotificationsToRedux([]))
  }, [])

  if (error) {
    toast.show({
      title: 'Xəta baş verdi. Yeniləyin',
      placement: 'bottom',
      status: 'error'
    });
  }

  if (status === 'loading') {
    return <Loader />;
  }

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const notificationList = flatNotificationList(data?.pages);
  const newNotifications = notificationList.filter((i) => i?.notificationState !== 'READ');

  const EndWrapper = (props: {children: React.ReactNode | null}) => {
    const { children } = props;

    return (
      <Box flex={1} marginY={10} alignItems="center">
        {children}
      </Box>
    );
  };

  let EndComponent = <View mb={9}/>;

  if (notificationList?.length === 0) {
    EndComponent = (
      <EndWrapper>
        <Text fontStyle="italic">Bildiriş yoxdur</Text>
      </EndWrapper>
    );
  }

  if (isFetchingNextPage) {
    EndComponent = (
      <EndWrapper>
        <Text>Yüklənir...</Text>
      </EndWrapper>
    );
  }

  const onRefresh = () => {
    refetch();
  };

  return (
    <FlatList
      style={notificationStyle.notificationList}
      data={notificationList}
      extraData={hasNextPage}
      renderItem={({ item }) => (
        <NotificationItemContainer
          newNotifications={newNotifications}
          {...item}
        />
      )}
      keyExtractor={(item) => item.id?.toString()}
      ItemSeparatorComponent={() => (<NotificationItemSeparator />)}
      onEndReached={loadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={EndComponent}
      onRefresh={onRefresh}
      refreshing={isFetching && !isFetchingNextPage}
      showsVerticalScrollIndicator={false}
    />
  );
};
