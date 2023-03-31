import * as Notifications from 'expo-notifications';
import { IosAuthorizationStatus } from 'expo-notifications';
import { Platform } from 'react-native';
import { PermissionStatus } from 'expo-modules-core';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { useEffect } from 'react';
import EventSource from 'react-native-sse';
import { getEnvironment } from '../config';
import { getToken } from '../Token';
import { NotificationHandler } from './NotificationHandler';
import store from "../../store/store";
import {saveNotificationsToRedux} from "../../store/slices/notifications.slice";

const BACKGROUND_PUSH_NOTIFICATION_TASK = 'BACKGROUND_PUSH_NOTIFICATION_TASK';

TaskManager.defineTask(BACKGROUND_PUSH_NOTIFICATION_TASK, async () => {
  subscribeForPushNotifications();

  // Be sure to return the successful result type!
  return BackgroundFetch.Result.NewData;
});

BackgroundFetch.registerTaskAsync(BACKGROUND_PUSH_NOTIFICATION_TASK, {
  minimumInterval: 5, // 15 minutes
  stopOnTerminate: false, // android only,
  startOnBoot: true // android only
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

const subscribeForPushNotifications = () => {
  const token = getToken();

  if (!token) {
    return;
  }

  const environment = getEnvironment();
  const eventSource = new EventSource(`${environment.notificationUrl}/subscribe?token=${token}`);

  console.log('Event source subscribed');

  eventSource.addEventListener('message', (event: any) => {
    let data;
    try {
      data = JSON.parse(event.data);
    } catch (e) {
      throw new Error(e);
    }
    console.log('New message received, fire Push notification');
    store.dispatch(saveNotificationsToRedux(data?.notificationState));
    Notifications.scheduleNotificationAsync({
      content: {
        title: data?.title,
        body: data?.content,
        data: { ...data }
      },
      trigger: {
        seconds: 1
      }
    });
    try {
      switch (data.notificationType) {
        case 'SERVICE_ORDER_QUESTIONNAIRE':
        case 'SERVICE_ORDER_QUESTIONNAIRE_WHEN_WORK_CANCELLED_FROM_B':
        case 'SERVICE_ORDER_QUESTIONNAIRE_WHEN_WORK_FINISHED_FROM_B':
        case 'SERVICE_ORDER_QUESTIONNAIRE_WHEN_WORK_CANCELLED_FROM_C': {
          NotificationHandler(data);
          break;
        }
        default: {
          break;
        }
      }
    } catch (e) {
      throw new Error(e);
    }
  });
};

export const NotificationListener = () => {
  // const navigation = useNavigation();
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request;
      NotificationHandler(data.content.data);
    });

    return () => subscription.remove();
  }, []);

  return true;
};

async function askPermissionForNotification(): Promise<boolean> {
  let authorized = false;

  const permission = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true
    }
  });

  if (Platform.OS === 'ios') {
    if (permission.ios?.status === IosAuthorizationStatus.AUTHORIZED) {
      authorized = true;
    }
  } else if (permission.status === PermissionStatus.GRANTED) {
    authorized = true;
  }

  console.log('Authorized for push notification: ', authorized);

  return authorized;
}

/**
 * This function will register background tasks for push notifications
 */
export async function registerTaskForNotification(): Promise<boolean> {
  const successfullyRegistered = false;

  // ask permission to push notifications before initializing them
  const isAuthorizedForNotification = await askPermissionForNotification();

  if (!isAuthorizedForNotification) {
    return false;
  }

  subscribeForPushNotifications();

  return successfullyRegistered;
}
