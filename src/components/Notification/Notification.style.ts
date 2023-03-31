import { StyleSheet } from 'react-native';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import useFontStyles from '../common/font.style';

export const useNotificationStyles = () => {
  const { theme } = useTheme() as ThemeContextType;
  const fonts = useFontStyles();

  return StyleSheet.create({
    notificationList: {
      paddingTop: 20
    },
    notificationItemSeparator: {
      width: '100%',
      height: 1,
      backgroundColor: theme.palette.color.bgGray,
      marginVertical: 16
    },
    notificationItem: {
      flex: 1,
      maxHeight: 115,
      justifyContent: 'space-between',
      paddingHorizontal: 20
    },
    notificationMessageText: {
      ...fonts.fontFamilyInterBold,
      fontSize: 14,
      lineHeight: 22
    },
    notificationDateText: {
      ...fonts.fontFamilyInterRegular,
      fontSize: 14,
      color: theme.palette.color.muted,
      marginTop: 16
    },
    viewedNotificationTitle: {
      color: theme.palette.color.cardListLabelColor
    },
    newNotificationEllipse: {
      backgroundColor: theme.palette.color.danger,
      width: 12,
      height: 12,
      borderRadius: 100 / 2,
      marginTop: 7
    },
    headerNewNotificationEllipse: {
      position: 'absolute',
      right: 0,
      top: 0,
      marginTop: 3,
      width: 11,
      height: 11
    }
  });
};
