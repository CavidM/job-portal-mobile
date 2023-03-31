import { StyleSheet } from 'react-native';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import normalize from '../../pages/common/styles/normalize';
import { isPlatformIOS } from '../../core/theme/Constants';

export default function useStyles(active: boolean = false) {
  const { theme } = useTheme() as ThemeContextType;
  const primaryColor = active ? theme.palette.color.guestColor : theme.palette.color.primary;

  return StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: theme.palette.color.cardBorderColor,
      width: normalize(344),
      borderRadius: 10,
      marginBottom: 16
    },
    cardListLabel: {
      fontSize: 12,
      color: theme.palette.color.cardListLabelColor,
      marginBottom: 4
    },
    cardListValue: {
      fontSize: 14,
      color: theme.palette.color.dark
    },
    cardListWrapper: {
      marginTop: 18,
      marginBottom: 16,
      marginHorizontal: 16
    },
    cardOrdersLabel: {
      fontSize: 14,
      color: primaryColor,
      marginLeft: normalize(8),
      marginBottom: normalize(8),
      bottom: isPlatformIOS ? 2 : 3
    },
    orangeColor: {
      color: theme.palette.ApplicantColor
    },
    darkColor: {
      color: theme.palette.color.dark
    },
    cardOrdersValue: {
      marginLeft: normalize(25),
      fontSize: 12,
      color: theme.palette.color.muted
    },
    cardAnnouncementsValue: {
      color: theme.palette.color.lightBlack
    },
    cardOrdersStatus: {
      width: normalize(24),
      height: normalize(24),
      backgroundColor: theme.palette.color.neutral,
      borderRadius: 8,
      bottom: normalize(5),
      marginLeft: normalize(10),
      alignItems: 'center'
    },
    usersCardItemContainer: {
      backgroundColor: theme.palette.color.cardBackgroundColor,
      height: normalize(97),
      marginVertical: 5,
      borderRadius: 5
    },
    callButton: {
      backgroundColor: active ? theme.palette.color.primary : theme.palette.color.gray,
      height: normalize(91),
      width: normalize(44),
      position: 'absolute',
      right: 3,
      top: 3,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'rgba(0, 0, 0, 0.4)',
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
        height: 0.3,
        width: 0.3
      },
      elevation: 5
    },
    cardOrders: {
      borderRadius: 16
    },
    cardListWrapperProfile: {
      marginBottom: 16
    },
    applicantOrderSalary: {
      alignSelf: 'flex-end',
      backgroundColor: theme.palette.color.neutral,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 7
    },
    announcementSalaryLabel: {
      color: theme.palette.color.white,
      fontSize: 10,
      fontFamily: 'InterExtraBold'
    },
    announcementSalary: {
      alignSelf: 'flex-end',
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderColor: primaryColor,
      borderWidth: 1,
      backgroundColor: primaryColor
    },
    announcementSource: {
      fontSize: 12,
      color: theme.palette.color.otpDisabledTextColor
    },
    callButtonText: {
      color: theme.palette.color.white,
      fontSize: 14
    }
  });
}
