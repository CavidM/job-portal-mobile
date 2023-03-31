import { useToast } from 'native-base';
import React from 'react';
import { useQueryClient } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { Labels } from '../../../core/Langs';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import ButtonComponent from '../../../components/button/Button';
import normalize from '../../common/styles/normalize';
import { AnnouncementService } from '../../../services/announcement-service/Customer/Announcement.service';
import { AppScreens } from '../../../routes/Navigator.types';

const announcementService = AnnouncementService();
interface AcceptOrDeclineButtonsProps {
    announcementId: number,
}
export const DeleteAnnouncementButton = (props: AcceptOrDeclineButtonsProps) => {
  const { announcementId } = props;
  const { theme } = useTheme() as ThemeContextType;
  const toast = useToast();
  const { mutate } = announcementService.useDeleteAnnouncement();
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const onPressDeleteButton = (id:number) => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries('/announcements');
        navigation.navigate(AppScreens.CustomerAnnouncements);
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
    <ButtonComponent
      buttonTextStyle={{ fontSize: normalize(14), fontFamily: 'InterMedium' }}
      variant="primary"
      title={Labels.deleteAnnouncement}
      size="sm"
      onPress={() => onPressDeleteButton(announcementId)}
      style={{
        margin: 5,
        backgroundColor: theme.palette.color.danger,
        width: normalize(153),
        height: normalize(44),
        alignSelf: 'center'
      }}
    />
  );
};
