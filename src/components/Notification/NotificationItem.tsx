import { Box, HStack, Text } from 'native-base';
import React from 'react';
import moment from 'moment';
import 'moment/locale/az';
import { View } from 'react-native';
import { useNotificationStyles } from './Notification.style';
import { NotificationItemProps } from '../../services/notification-service/NotificationService.types';

export const NotificationItem = (data: NotificationItemProps) => {
  const styles = useNotificationStyles();
  const { content, notificationState, createdDate } = data;

  const boxStyle: object[] = [styles.notificationItem];
  const titleStyle: object[] = [styles.notificationMessageText];

  const notificationStateRead = notificationState === 'READ';

  if (notificationStateRead) {
    titleStyle.push(styles.viewedNotificationTitle);
  }

  return (
    <HStack style={boxStyle}>
      <Box style={{ width: '95%' }}>
        <Text
          style={titleStyle}
        >
          {content}
        </Text>
        <Text
          style={[styles.notificationDateText]}
        >
          {moment(createdDate).calendar()}
        </Text>
      </Box>
      {!notificationStateRead
        && <View style={styles.newNotificationEllipse} />}
    </HStack>
  );
};
