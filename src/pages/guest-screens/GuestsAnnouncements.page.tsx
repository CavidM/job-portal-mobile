import { useNavigation } from '@react-navigation/native';
import { Box } from 'native-base';
import { TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { ServiceResponseWithPagination } from '../../services/service.types';
import {
  ApplicantAnnouncementsModel,
  ApplicantAnnouncementsResponseProps
} from '../../services/announcement-service/Applicant/ApplicantAnnouncmentService.types';
import useStyles from '../../components/Card/CardList.style';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import { AppScreens } from '../../routes/Navigator.types';
import { ApplicantAnnouncementsCard } from '../applicant-screens/announcements/ApplicantAnnouncementsCard/ApplicantAnnouncementsCard';
import Loader from '../../components/Loader/Loader';
import { FlatListComponent } from '../../components/FlatList/FlatList';
import { AnnouncementService } from '../../services/announcement-service/Guest/GuestsAnnouncements.service';
import Button from '../../components/button/Button';
import normalize from '../common/styles/normalize';
import useFontStyles from '../../components/common/font.style';

const announcementService = AnnouncementService();

export const flatAnnouncementList = (
  list: ServiceResponseWithPagination<ApplicantAnnouncementsResponseProps>[] | undefined
) => {
  const data: ApplicantAnnouncementsModel[] = [];

  list?.forEach((item) => {
    item.data?.data?.data?.forEach((announcement: any) => data.push(announcement));
  });

  return data;
};
export const GuestAnnouncementsPage = () => {
  const styles = useStyles();
  const fontStyles = useFontStyles();
  const navigation = useNavigation();
  const { theme } = useTheme() as ThemeContextType;
  const {
    data, isLoading, hasNextPage,
    fetchNextPage, refetch, isFetchingNextPage, isFetching
  } = announcementService.useGetGuestAnnouncement();

  const renderItem = ({ item } : any) => (
    <Box>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate(
          AppScreens.EntryAuth
        )}
      >
        <View
          style={[styles.card, styles.cardOrders, { backgroundColor: theme.palette.color.white }]}
        >
          <View style={styles.cardListWrapper}>
            <ApplicantAnnouncementsCard
              {...item}
              isUserTypeGuest
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Box>
  );

  const announcementsData = flatAnnouncementList(data?.pages);

  return (
    <>
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
      <View style={{
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        height: normalize(130),
        alignItems: 'center',
        position: 'absolute',
        width: '100%'
      }}
      >
        <Button
          variant="default"
          onPress={() => navigation.navigate(AppScreens.RegisterBeforeVerification)}
          title="Qeydiyyatdan keç"
          size="sm"
          buttonTextStyle={[{ fontSize: normalize(14) }, fontStyles.fontFamilyInterRegular]}
          style={{ marginBottom: 0 }}
        />
        <Button
          variant="primary"
          onPress={() => navigation.navigate(AppScreens.EntryAuth)}
          title="Daxil ol"
          color={theme.palette.CustomerColor}
          size="sm"
          buttonTextStyle={[{ fontSize: normalize(14) }, fontStyles.fontFamilyInterRegular]}
          style={{ marginTop: 10 }}
        />
      </View>
    </>
  );
};
