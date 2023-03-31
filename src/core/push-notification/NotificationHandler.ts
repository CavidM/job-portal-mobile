import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationPayload } from './NotificationHandler.types';
import { navigate } from '../../tools/RootNavigation';
import { loadOrderUsersSearchParams } from '../../store/slices/orderUsersSearchParams.slice';
import store from '../../store/store';
import { saveQuestionnaireToRedux } from '../../store/slices/questionnaire.slice';
import { UserTypeApplicant } from '../../context/Registration.context';
import { AppScreens } from '../../routes/Navigator.types';
import { saveNotificationsToRedux } from '../../store/slices/notifications.slice';

export const useScheduledOrderSearchUserFindHandler = (data: NotificationPayload) => {
  store.dispatch(loadOrderUsersSearchParams(data.entity));
  navigate('ServiceOrderUsersSearchResult');
};
export const useServiceOrderQuestionnaireHandler = (data: NotificationPayload) => {
  store.dispatch(saveQuestionnaireToRedux(data.entity?.userQuestionnaireId
    || data.entity?.questionnaireId));

  AsyncStorage.getItem('userType', (error, userType) => {
    if (error) {
      console.log(error);
    }

    if (userType) {
      switch (userType) {
        case UserTypeApplicant: {
          navigate(AppScreens.ApplicantEvaluateOrder);
          break;
        }
        default:
          navigate(AppScreens.CustomerEvaluateOrder);
      }
    }
  });
};

export const useServiceOrderDetailsHandler = (data: NotificationPayload) => {
  AsyncStorage.getItem('userType', (error, userType) => {
    if (error) {
      console.log(error);
    }
    if (userType) {
      switch (userType) {
        case UserTypeApplicant: {
          navigate(AppScreens.ApplicantOrdersDetails, { id: data?.entity?.serviceOrderUserId });
          break;
        }
        default:
          navigate(AppScreens.CustomerOrdersDetails, { id: data?.entity?.serviceOrderId });
      }
    }
  });
};

export const NotificationHandler = (data: NotificationPayload) => {
  console.log('New notification handled');
  store.dispatch(saveNotificationsToRedux([]));
  switch (data.notificationType) {
    case 'SCHEDULED_ORDER_SEARCH_USER_FOUND': {
      useScheduledOrderSearchUserFindHandler(data);
      break;
    }
    case 'SCHEDULED_QUESTIONNAIRE':
    case 'SERVICE_ORDER_QUESTIONNAIRE':
    case 'SERVICE_ORDER_QUESTIONNAIRE_WHEN_WORK_CANCELLED_FROM_B':
    case 'SERVICE_ORDER_QUESTIONNAIRE_WHEN_WORK_FINISHED_FROM_B':
    case 'SERVICE_ORDER_QUESTIONNAIRE_WHEN_WORK_CANCELLED_FROM_C': {
      useServiceOrderQuestionnaireHandler(data);
      break;
    }
    case 'ORDER_REQUEST_SENT':
    case 'ORDER_REQUEST_ACCEPTED':
    case 'ORDER_REQUEST_DECLINED':
    case 'ORDER_CANCELLED':
      useServiceOrderDetailsHandler(data);
      break;
    default: {
      break;
    }
  }
};
