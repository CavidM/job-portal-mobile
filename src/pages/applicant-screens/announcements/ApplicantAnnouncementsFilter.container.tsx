import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { InformationService } from '../../../services/information-service/Information.service';
import { ApplicantAnnouncementsFilterPage } from './ApplicantAnnouncementsFilterPage';
import { AnnouncementService } from '../../../services/announcement-service/Applicant/ApplicantAnnouncement.service';
import { AppScreens } from '../../../routes/Navigator.types';
import {
  announcementsFilterSelectors,
  saveAnnouncementFilterToRedux, saveAnnouncementsSpecificationsToRedux
} from '../../../store/slices/announcements.slice';
import useForm from '../../../core/form/Form';
import {
  getNonEmptyFilterParams, getSpecificationsIds
} from './AnnouncementsFilterImplementation';

const informationService = InformationService();
const announcementService = AnnouncementService();

export interface AnnouncementFilterProps {
  maxSalary: number;
  gender: string;
  isAgreedPrice: boolean;
  isStarred: boolean;
  specificationsIds: any[];
  announcementType: string;
  minSalary: number;
  cityId: string;
  announcementStatus: string,
  salary: [number, number]
}
export const ApplicantAnnouncementsFilterContainer = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data: cities } = informationService.useGetCities();
  const {
    data: selectedSpecifications
  } = announcementService.useGetAnnouncementSpecificationList();
  const selectedSpecificationsIds = getSpecificationsIds(selectedSpecifications?.data?.data);

  const announcementFilter = useSelector(announcementsFilterSelectors.getAnnouncementFilter);

  const initialFormData:AnnouncementFilterProps = {
    announcementType: announcementFilter.announcementType,
    cityId: announcementFilter.cityId,
    isAgreedPrice: announcementFilter.isAgreedPrice,
    gender: announcementFilter.gender,
    salary: [announcementFilter.minSalary, announcementFilter.maxSalary],
    isStarred: announcementFilter.isStarred,
    specificationsIds: announcementFilter.specificationsIds
  };

  const {
    formData, onChange
  } = useForm(initialFormData);

  const onChangeFormData = (field: string, value: any) => {
    onChange(field, value);
  };

  useEffect(() => {
    dispatch(saveAnnouncementFilterToRedux(
      { ...formData, specificationsIds: selectedSpecificationsIds }
    ));
    dispatch(saveAnnouncementsSpecificationsToRedux(selectedSpecifications?.data?.data))
  }, [selectedSpecifications]);

  useEffect(() => {
    refetch().then(() => refetch());
  }, [announcementFilter]);

  useEffect(() => {
    dispatch(saveAnnouncementFilterToRedux({...formData, specificationsIds: selectedSpecificationsIds  }));
  }, [formData]);
  const filterParams = getNonEmptyFilterParams(announcementFilter);

  const {
    data: filteredData, refetch
  } = announcementService.useGetFilteredApplicantAnnouncement(filterParams);

  let totalElements;
  filteredData?.pages.forEach((item) => {
    totalElements = item.data?.data?.totalElements;
  });

  const onClickShowResultButton = () => {
    navigation.navigate(AppScreens.FilteredApplicantAnnouncements);
  };
  const onClickCancelButton = () => {
    queryClient.fetchInfiniteQuery(['/user-announcements']);
    navigation.navigate(AppScreens.ApplicantAnnouncements);
  };

  return (
    <ApplicantAnnouncementsFilterPage
      onClickCancelButton={onClickCancelButton}
      cities={cities?.data.data ?? []}
      onChangeFormData={onChangeFormData}
      announcementCount={totalElements || 0}
      onClickShowResultButton={onClickShowResultButton}
      formData={formData}
      selectedSpecificationsIds={selectedSpecificationsIds}
    />
  );
};
