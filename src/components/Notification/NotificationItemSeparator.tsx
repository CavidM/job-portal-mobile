import { Box } from 'native-base';
import React from 'react';
import { useNotificationStyles } from './Notification.style';

export const NotificationItemSeparator = () => {
  const styles = useNotificationStyles();

  return (
    <Box style={styles.notificationItemSeparator} />
  );
};
