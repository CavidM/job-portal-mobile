import {
  FlatList, TouchableWithoutFeedback, View
} from 'react-native';
import React from 'react';
import { Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import { ApplicantOrdersCardList } from './ApplicantOrdersCard/ApplicantOrdersCardList';
import { AppScreens } from '../../../routes/Navigator.types';
import { ApplicantOrderStatusKeys, ApplicantOrderStatusLabels } from '../../../core/Constants';
import Loader from '../../../components/Loader/Loader';
import {
  ApplicantOrdersModel,
  ApplicantOrderStatusResponseProps
} from '../../../services/order-service/Applicant/ApplicantOrderService.types';
import { DropdownContainer } from '../../../components/Dropdown/DropdownContainer';
import { FlatListEndComponent } from '../../../components/FlatList/FlatListEndComponent';

interface ApplicantOrdersPageProps {
  ordersData?: ApplicantOrdersModel[],
  onSelectStatus: (status: string) => void,
  onScroll: () => void,
  isLoading: boolean,
  isFetching: boolean,
  ordersStatusData: ApplicantOrderStatusResponseProps[],
  isFetchingNextPage: boolean,
  onRefresh: () => void,
  hasNextPage: boolean
}

export const ApplicantOrdersPage = (props: ApplicantOrdersPageProps) => {
  const navigation = useNavigation();
  const { theme } = useTheme() as ThemeContextType;
  const {
    ordersData, isLoading, onSelectStatus, onScroll, ordersStatusData,
    onRefresh, isFetchingNextPage, isFetching, hasNextPage

  } = props;
  const ApplicantOrdersCountArray = ordersStatusData?.map((i) => i.count);
  const totalElements = ApplicantOrdersCountArray?.length !== 0
    ? ApplicantOrdersCountArray?.reduce((a, b) => a + b)
    : 0;
  const items = [
    {
      key: '',
      label: 'Hamısı',
      count: totalElements
    },
    {
      key: ApplicantOrderStatusKeys.Done,
      label: ApplicantOrderStatusLabels.Done,
      count: ordersStatusData?.find((
        data: ApplicantOrderStatusResponseProps
      ) => data.serviceOrderUserStatus === ApplicantOrderStatusKeys.Done)?.count
    },
    {
      key: ApplicantOrderStatusKeys.Accepted,
      label: ApplicantOrderStatusLabels.InProgress,
      count: ordersStatusData?.find((
        data: ApplicantOrderStatusResponseProps
      ) => data.serviceOrderUserStatus === ApplicantOrderStatusKeys.InProgress)?.count
    },
    {
      key: ApplicantOrderStatusKeys.Pending,
      label: ApplicantOrderStatusLabels.Pending,
      count: ordersStatusData?.find((
        data: ApplicantOrderStatusResponseProps
      ) => data.serviceOrderUserStatus === ApplicantOrderStatusKeys.Pending)?.count
    },
    {
      key: ApplicantOrderStatusKeys.Declined,
      label: ApplicantOrderStatusLabels.Declined,
      count: ordersStatusData?.find((
        data: ApplicantOrderStatusResponseProps
      ) => data.serviceOrderUserStatus === ApplicantOrderStatusKeys.Declined)?.count
    },
    {
      key: ApplicantOrderStatusKeys.Canceled,
      label: ApplicantOrderStatusLabels.Canceled,
      count: ordersStatusData?.find((
        data: ApplicantOrderStatusResponseProps
      ) => data.serviceOrderUserStatus === ApplicantOrderStatusKeys.Canceled)?.count
    }
  ];
  const renderItem = ({ item }: any) => (
    <Box>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate(AppScreens.ApplicantOrdersDetails,
          { id: item?.serviceOrderUserId })}
      >
        <View>
          <ApplicantOrdersCardList
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
      {(isFetching && !isFetchingNextPage) && <Loader />}
      {
        !isLoading && (
          <FlatList
            style={{ marginTop: 10 }}
            data={ordersData}
            renderItem={renderItem}
            onEndReached={onScroll}
            onEndReachedThreshold={0.1}
            keyExtractor={(item) => item.serviceOrderUserId?.toString()}
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
