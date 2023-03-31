import {
  TouchableWithoutFeedback, View
} from 'react-native';
import React from 'react';
import { Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import { AppScreens } from '../../../routes/Navigator.types';
import { AnnouncementService } from '../../../services/announcement-service/Customer/Announcement.service';
import { ServiceResponseWithPagination } from '../../../services/service.types';
import { CustomerAnnouncementsCard } from './CustomerAnnouncementsCard/CustomerAnnouncementsCard';
import useStyles from '../../../components/Card/CardList.style';
import {
  AnnouncementsModel,
  AnnouncementsResponseProps
} from '../../../services/announcement-service/Customer/AnnouncmentService.types';
import Loader from '../../../components/Loader/Loader';
import { FlatListComponent } from '../../../components/FlatList/FlatList';

const announcementService = AnnouncementService();

export const flatAnnouncementList = (
  list: ServiceResponseWithPagination<AnnouncementsResponseProps>[] | undefined
) => {
  const data: AnnouncementsModel[] = [];

  list?.forEach((item) => {
    item.data?.data?.data?.forEach((announcement: any) => data.push(announcement));
  });

  return data;
};
export const CustomerAnnouncementsPage = () => {
  const styles = useStyles();

  const navigation = useNavigation();
  const { theme } = useTheme() as ThemeContextType;
  const {
    data, isLoading, hasNextPage,
    fetchNextPage, refetch, isFetchingNextPage, isFetching
  } = announcementService.useGetCustomerAnnouncement();

  const renderItem = ({ item } : any) => (
    <Box>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate(
          AppScreens.CustomerAnnouncementDetails, { id: item?.id }
        )}
      >
        <View
          style={[styles.card, styles.cardOrders, { backgroundColor: theme.palette.color.white }]}
        >
          <View style={styles.cardListWrapper}>
            <CustomerAnnouncementsCard
              {...item}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Box>
  );

  const announcementsData = flatAnnouncementList(data?.pages);

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
      {(isFetching && !isFetchingNextPage) && <Loader /> }
      {
          !isLoading && (
          <FlatListComponent
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            reFetch={refetch}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            renderItem={renderItem}
            data={announcementsData}
          />
          )
        }
    </View>
  );
};
