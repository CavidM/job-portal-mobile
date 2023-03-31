import { StyleSheet } from 'react-native';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import normalize from '../../pages/common/styles/normalize';

export default function useStyles() {
  const { theme } = useTheme() as ThemeContextType;

  return StyleSheet.create({
    input: {
      height: normalize(66),
      width: normalize(66),
      marginHorizontal: normalize(5),
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.palette.color.inputBorderColor,
      fontSize: normalize(34),
      textAlign: 'center',
      fontWeight: '400',
      alignSelf: 'center',
      justifyContent: 'center'

    },
    containerInput: {
      flex: 1,
      flexDirection: 'row'
    },
    otpDisabled: {
      backgroundColor: theme.palette.color.otpDisabledInputColor,
      color: theme.palette.color.otpDisabledTextColor
    }
  });
}
