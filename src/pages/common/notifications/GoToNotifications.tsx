import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AppScreens } from '../../../routes/Navigator.types';
import NotificationIconHeader from '../../../components/Icons/NotificationIconHeader';
import { RegistrationContextType, useRegistration, UserTypeApplicant } from '../../../context/Registration.context';
import { useNotificationStyles } from '../../../components/Notification/Notification.style';
import { notificationsSelectors } from '../../../store/slices/notifications.slice';

export const GoToNotifications = () => {
  const { userType } = useRegistration() as RegistrationContextType;
  const styles = useNotificationStyles();
  const notifications = useSelector(notificationsSelectors.getNotifications);
  const newNotifications = notifications?.newNotifications.length;
  const navigateToNotifications = () => {
    switch (userType) {
      case UserTypeApplicant:
        navigation.navigate(AppScreens.ApplicantNotifications);
        break;
      default:
        navigation.navigate(AppScreens.CustomerNotifications);
        break;
    }
  };
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ marginRight: 20, paddingRight: 3 }}
      onPress={navigateToNotifications}
      accessible
      accessibilityLabel="notification-icon-button"
    >
      <NotificationIconHeader />
      {newNotifications
        ? <View style={[styles.newNotificationEllipse, styles.headerNewNotificationEllipse]} />
        : null}

    </TouchableOpacity>
  );
};
