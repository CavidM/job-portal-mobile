import { StyleSheet } from 'react-native';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import normalize from './normalize';

export function useLayoutStyles() {
  const { theme } = useTheme() as ThemeContextType;

  return StyleSheet.create({
    pageBodyWrapper: {
      // flex: 1,
      alignItems: 'center',
      // height: '100%'
    },
    pageBodyWrapperOnKeyboard: {
      marginBottom: normalize(100)
    },
    regAfterVerifPageBodyWrapperOnKeyboard: {
      marginBottom: 0
    },
    pageTitle: {
      width: normalize(324),
      alignItems: 'flex-start',
      fontSize: normalize(30),
      marginBottom: normalize(35),
      marginTop: normalize(50)
    },
    regAfterVerifPageBodyWrapper: {
      // flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: normalize(100)
    },
    registerAfterVerificationPageTitle: {
      fontSize: normalize(30),
      alignItems: 'flex-start',
      width: normalize(324),
      marginBottom: normalize(30),
      marginTop: normalize(36)

    },
    formInput: {
      marginVertical: 10
    },
    formInputGeneralInfo: {
      marginVertical: normalize(10)
    },
    container: {
      width: '85%'
    },
    textStyleForUploadphoto: {
      fontSize: normalize(22),
      color: theme.palette.color.dark,
      marginTop: normalize(30)
    },
    stickyHeaderStyle: {
      backgroundColor: theme.palette.color.primary,
      height: normalize(100)
    },
    headerBarStyle: {
      backgroundColor: theme.palette.color.primary,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      height: normalize(70)
    },
    FocusedNavbarIcon: {
      marginBottom: 55,
      backgroundColor: theme.palette.color.primary,
      borderWidth: 4,
      borderColor: theme.palette.color.white,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100 / 2,
      width: normalize(64),
      height: normalize(64)
    },
    ListFooterComponentText: {
      fontSize: 14,
      fontFamily: 'InterMedium',
      paddingBottom: 15,
      paddingHorizontal: 5,
      color: theme.palette.color.infoColor
    }
  });
}
