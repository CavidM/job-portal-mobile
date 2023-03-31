import { StyleSheet } from 'react-native';
import { ButtonVariants } from '../../core/theme/Constants';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import normalize from '../../pages/common/styles/normalize';

export default function useStyles() {
  const { theme } = useTheme() as ThemeContextType;

  return StyleSheet.create({
    primaryButtonText: {
      color: theme.palette.color.textWhite
    },
    iconButtonText: {
      color: theme.palette.color.textWhite,
      fontSize: normalize(22),
      paddingHorizontal: normalize(36)
    },
    buttonText: {
      fontSize: normalize(16),
      color: theme.palette.color.textDark
    },
    buttonSizeSm: {
      width: normalize(324),
      height: normalize(45),
      borderRadius: normalize(10),
      fontSize: normalize(13)
    },
    buttonSizeMd: {
      width: normalize(324),
      height: normalize(65)
    },
    buttonSizeLg: {
      width: normalize(324),
      height: normalize(114)
    },
    button: {
      borderRadius: normalize(20),
      margin: normalize(15),
      alignItems: 'center',
      justifyContent: 'center'
    },
    shadow: {
      shadowColor: theme.palette.color.dark,
      elevation: 6,
      shadowOffset: {
        width: 0,
        height: 6
      },
      shadowOpacity: 0.37,
      shadowRadius: normalize(7.49)
    },
    buttonIcon: {
      borderRadius: normalize(40),
      flexDirection: 'row',
      width: normalize(83),
      justifyContent: 'space-between',
      paddingEnd: normalize(36)
    },
    [ButtonVariants.primary]: {
      backgroundColor: theme.palette.color.primary
    },
    [ButtonVariants.outline]: {
      backgroundColor: theme.palette.color.white,
      borderWidth: 3,
      borderColor: theme.palette.color.primary
    },
    [ButtonVariants.default]: {
      backgroundColor: theme.palette.color.gray
    },
    [ButtonVariants.secondary]: {
      backgroundColor: theme.palette.color.secondary
    },
    selected: {
      borderWidth: 3,
      borderColor: theme.palette.color.white
    }
  });
}
