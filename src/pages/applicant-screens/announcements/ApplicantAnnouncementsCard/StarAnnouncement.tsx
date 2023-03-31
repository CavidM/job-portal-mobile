import { useToast } from 'native-base';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { TouchableOpacity } from 'react-native';
import { ThemeContextType, useTheme } from '../../../../core/theme/Theme';
import normalize from '../../../common/styles/normalize';
import { StarFavourite } from '../../../../components/Icons/StarFavourite';
import { AnnouncementService } from '../../../../services/announcement-service/Applicant/ApplicantAnnouncement.service';

const announcementService = AnnouncementService();
interface AcceptOrDeclineButtonsProps {
    announcementId: number,
    starred: any
}
export const StarAnnouncementButton = (props: AcceptOrDeclineButtonsProps) => {
  const { announcementId, starred } = props;
  const { theme } = useTheme() as ThemeContextType;
  const toast = useToast();
  const { mutate } = announcementService.useStarAnnouncement();
  const queryClient = useQueryClient();
  const onPressStarButton = (id:number) => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries('/user-announcements');
      },
      onError: () => {
        toast.show({
          placement: 'bottom',
          title: 'Xəta baş verdi',
          status: 'error',
          width: normalize(324)
        });
      }
    });
  };
  return (
    <TouchableOpacity onPress={() => onPressStarButton(announcementId)}>
      <StarFavourite pathProps={starred && { fill: theme.palette.color.primary }} />
    </TouchableOpacity>
  );
};
