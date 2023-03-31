import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient } from 'react-query';
import { CustomerAnnouncementsFilterPage } from './CustomerAnnouncementsFilterPage';
import { AnnouncementService } from '../../../services/announcement-service/Customer/Announcement.service';
import { AppScreens } from '../../../routes/Navigator.types';
import {
  announcementsFilterSelectors,
  saveAnnouncementStatusToRedux,
  saveAnnouncementTypeToRedux
} from '../../../store/slices/announcements.slice';

const announcementService = AnnouncementService();

export const CustomerAnnouncementsFilterContainer = () => {
  const announcementType = useSelector(announcementsFilterSelectors.getAnnouncementType);

  const announcementStatus = useSelector(announcementsFilterSelectors.getAnnouncementStatus);
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onChangeAnnouncementType = (element: string) => {
    dispatch(saveAnnouncementTypeToRedux(element));
  };
  const onChangeAnnouncementStatus = (element: string) => {
    dispatch(saveAnnouncementStatusToRedux(element));
  };
  const {
    data: filteredData, refetch
  } = announcementService.useGetCustomerAnnouncement(announcementType, announcementStatus);

  let totalElements;
  filteredData?.pages.forEach((item) => {
    totalElements = item.data?.data?.totalElements;
  });

  useEffect(() => {
    refetch().then(() => refetch());
  }, [announcementType, announcementStatus]);

  const onClickShowResultButton = () => {
    navigation.navigate(AppScreens.CustomerAnnouncements);
  };

  const onClickCancelButton = () => {
    queryClient.fetchInfiniteQuery(['/announcements']);
    navigation.navigate(AppScreens.CustomerAnnouncements);
  };

  return (
    <CustomerAnnouncementsFilterPage
      onChangeAnnouncementType={onChangeAnnouncementType}
      onChangeAnnouncementStatus={onChangeAnnouncementStatus}
      announcementCount={totalElements || 0}
      onClickShowResultButton={onClickShowResultButton}
      onClickCancelButton={onClickCancelButton}
    />
  );
};
