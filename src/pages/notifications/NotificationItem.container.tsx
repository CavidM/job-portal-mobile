import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useToast } from 'native-base';
import { useQueryClient } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { NotificationItemProps } from '../../services/notification-service/NotificationService.types';
import { NotificationItem } from '../../components/Notification/NotificationItem';
import { loadOrderUsersSearchParams } from '../../store/slices/orderUsersSearchParams.slice';
import { NotificationService } from '../../services/notification-service/Notification.service';
import { AppScreens } from '../../routes/Navigator.types';
import Loader from '../../components/Loader/Loader';
import { saveQuestionnaireToRedux } from '../../store/slices/questionnaire.slice';
import { RegistrationContextType, useRegistration, UserTypeApplicant } from '../../context/Registration.context';

export const NotificationItemContainer = (props: NotificationItemProps) => {
  const {
    notificationType, entity, id
  } = props;
  const dispatch = useDispatch();
  const notificationService = NotificationService();
  const { mutate, isLoading } = notificationService.useMaskAsReadNotification();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { userType } = useRegistration() as RegistrationContextType;

  const onError = () => {
    toast.show({
      placement: 'bottom',
      title: 'Xəta baş verdi',
      status: 'error'
    });
  };

  const onPress = () => {
    mutate(id, {
      onSuccess: () => {
        switch (notificationType) {
          case 'SCHEDULED_ORDER_SEARCH_USER_FOUND': {
            dispatch(loadOrderUsersSearchParams(entity));
            navigation.navigate(AppScreens.ServiceOrderUsersSearchResult);
            break;
          }
          case 'SCHEDULED_QUESTIONNAIRE':
          case 'SERVICE_ORDER_QUESTIONNAIRE':
          case 'SERVICE_ORDER_QUESTIONNAIRE_WHEN_WORK_CANCELLED_FROM_B':
          case 'SERVICE_ORDER_QUESTIONNAIRE_WHEN_WORK_FINISHED_FROM_B':
          case 'SERVICE_ORDER_QUESTIONNAIRE_WHEN_WORK_CANCELLED_FROM_C': {
            dispatch(saveQuestionnaireToRedux(
              entity?.userQuestionnaireId || entity?.questionnaireId
            ));
            switch (userType) {
              case UserTypeApplicant:
                navigation.navigate(AppScreens.ApplicantEvaluateOrder);
                break;
              default:
                navigation.navigate(AppScreens.CustomerEvaluateOrder);
                break;
            }
            break;
          }
          case 'ORDER_REQUEST_SENT':
          case 'ORDER_REQUEST_ACCEPTED':
          case 'ORDER_REQUEST_DECLINED':
          case 'ORDER_CANCELLED':
            switch (userType) {
              case UserTypeApplicant:
                navigation.navigate(AppScreens.ApplicantOrdersDetails,
                  { id: entity?.serviceOrderUserId }); break;
              default:
                navigation.navigate(AppScreens.CustomerOrdersDetails,
                  { id: entity?.serviceOrderId }); break;
            }
            break;
          default:
            break;
        }
      },
      onError: () => {
        onError();
      }
    });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      {
          isLoading
          && <Loader />
        }
      <NotificationItem {...props} />
    </TouchableOpacity>
  );
};
