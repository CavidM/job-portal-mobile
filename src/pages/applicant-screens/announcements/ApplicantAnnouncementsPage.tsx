import {TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import { ServiceResponseWithPagination } from '../../../services/service.types';
import { AnnouncementService } from '../../../services/announcement-service/Applicant/ApplicantAnnouncement.service';
import {
  ApplicantAnnouncementsModel,
  ApplicantAnnouncementsResponseProps
} from '../../../services/announcement-service/Applicant/ApplicantAnnouncmentService.types';
import { FlatListComponent } from '../../../components/FlatList/FlatList';
import Loader from '../../../components/Loader/Loader';
import useStyles from "../../../components/Card/CardList.style";
import {useNavigation} from "@react-navigation/native";
import {ThemeContextType, useTheme} from "../../../core/theme/Theme";
import {Box} from "native-base";
import {AppScreens} from "../../../routes/Navigator.types";
import {ApplicantAnnouncementsCard} from "./ApplicantAnnouncementsCard/ApplicantAnnouncementsCard";

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
export const ApplicantAnnouncementsPage = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const { theme } = useTheme() as ThemeContextType;
  const {
    data, isLoading, hasNextPage,
    fetchNextPage, refetch, isFetchingNextPage
  } = announcementService.useGetApplicantAnnouncement();

  const announcementsData = flatAnnouncementList(data?.pages);

  const renderItem = ({ item } : any) => (
      <Box>
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate(
                AppScreens.ApplicantAnnouncementDetails, { id: item?.id }
            )}
        >
          <View
              style={[styles.card, styles.cardOrders, { backgroundColor: theme.palette.color.white }]}
          >
            <View style={styles.cardListWrapper}>
              <ApplicantAnnouncementsCard
                  {...item}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Box>
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
      {(isLoading && !isFetchingNextPage) && <Loader /> }
      {
          !isLoading && (
          <FlatListComponent
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            reFetch={refetch}
            fetchNextPage={()=>fetchNextPage()}
            isFetchingNextPage={isFetchingNextPage}
            renderItem={renderItem}
            data={announcementsData}
          />
          )
        }
    </View>
  );
};
