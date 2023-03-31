import {
  FlatList, TouchableWithoutFeedback, View
} from 'react-native';
import React from 'react';
import { Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ThemeContextType, useTheme } from '../../../../core/theme/Theme';
import { CustomerOrdersCardList } from './CustomerOrdersCard/CustomerOrdersCardList';
import { AppScreens } from '../../../../routes/Navigator.types';
import { CustomerOrderStatusKeys, CustomerOrderStatusLabels } from '../../../../core/Constants';
import {
  CustomerOrdersModel,
  CustomerOrderStatusResponseProps
} from '../../../../services/order-service/Customer/OrderService.types';
import Loader from '../../../../components/Loader/Loader';
import { DropdownContainer } from '../../../../components/Dropdown/DropdownContainer';
import { FlatListEndComponent } from '../../../../components/FlatList/FlatListEndComponent';

interface CustomerOrdersPageProps {
    ordersData?: CustomerOrdersModel[],
    onSelectStatus: (status: string) => void,
    onScroll: () => void,
    isLoading: boolean,
    ordersStatusData: CustomerOrderStatusResponseProps[] | undefined,
    isFetchingNextPage: boolean,
    onRefresh: () => void,
    hasNextPage: boolean,
    isFetching: boolean
}

export const CustomerOrdersPage = (props: CustomerOrdersPageProps) => {
  const navigation = useNavigation();
  const { theme } = useTheme() as ThemeContextType;
  const {
    ordersData, isLoading, onSelectStatus, onScroll, ordersStatusData,
    onRefresh, isFetchingNextPage, hasNextPage, isFetching
  } = props;

  const customerOrdersCountArray = ordersStatusData?.map((i) => i.count);
  const totalElements = customerOrdersCountArray?.length !== 0
    ? customerOrdersCountArray?.reduce((a, b) => a + b)
    : 0;

  const items = [
    {
      key: '',
      label: 'Hamısı',
      count: totalElements
    },
    {
      key: CustomerOrderStatusKeys.Pending,
      label: CustomerOrderStatusLabels.PENDING,
      count: ordersStatusData?.find((
        data: CustomerOrderStatusResponseProps
      ) => data.status === CustomerOrderStatusKeys.Pending)?.count
    },
    {
      key: CustomerOrderStatusKeys.Canceled,
      label: CustomerOrderStatusLabels.CANCELLED,
      count: ordersStatusData?.find((
        data: CustomerOrderStatusResponseProps
      ) => data.status === CustomerOrderStatusKeys.Canceled)?.count
    },
    {
      key: CustomerOrderStatusKeys.Done,
      label: CustomerOrderStatusLabels.DONE,
      count: ordersStatusData?.find((
        data: CustomerOrderStatusResponseProps
      ) => data.status === CustomerOrderStatusKeys.Done)?.count
    },
    {
      key: CustomerOrderStatusKeys.InProgress,
      label: CustomerOrderStatusLabels.IN_PROGRESS,
      count: ordersStatusData?.find((
        data: CustomerOrderStatusResponseProps
      ) => data.status === CustomerOrderStatusKeys.InProgress)?.count
    }
  ];
  const renderItem = ({ item } : any) => (
    <Box>

      <TouchableWithoutFeedback
        onPress={() => navigation.navigate(AppScreens.CustomerOrdersDetails, { id: item?.id })}
      >
        <View>
          <CustomerOrdersCardList
            withDetailedContent={false}
            data={item}
            backgroundColor={theme.palette.color.white}
          />
        </View>
      </TouchableWithoutFeedback>
    </Box>
  );
  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
      <DropdownContainer onSelectStatus={onSelectStatus} items={items} />
      {(isFetching && !isFetchingNextPage) && <Loader /> }
      {
            !isLoading && totalElements !== 0 && (
              <FlatList
                style={{ marginTop: 10 }}
                data={ordersData}
                renderItem={renderItem}
                onEndReached={onScroll}
                onEndReachedThreshold={0.1}
                keyExtractor={(item) => item.id?.toString()}
                ListFooterComponent={(
                  <FlatListEndComponent
                    isFetchingNextPage={isFetchingNextPage}
                    hasNextPage={hasNextPage}
                    dataLength={ordersData?.length}
                  />
                )}
                onRefresh={onRefresh}
                refreshing={isLoading && isFetchingNextPage}
                showsVerticalScrollIndicator={false}
              />
            )
}
    </View>
  );
};
