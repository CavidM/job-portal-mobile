import { StyleSheet } from 'react-native';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import normalize from '../../pages/common/styles/normalize';

export default function useStyles() {
  const { theme } = useTheme() as ThemeContextType;

  return StyleSheet.create({
    input: {
      borderColor: theme.palette.color.inputBorderColor,
      color: theme.palette.color.dark,
      fontSize: 18,
      borderBottomWidth: 1,
      height: 40,
      backgroundColor: theme.palette.color.white
    },
    inputOutline: {
      borderWidth: 1,
      height: 40,
      borderRadius: 6,
      paddingLeft: 17
    },
    inputWithIcon: {
      paddingRight: 35
    },
    inputIcon: {
      position: 'absolute',
      right: 20,
      top: '30%'
    },
    selectPickerPlaceholder: {
      color: theme.palette.color.darkGray
    },
    selectPickerWrapper: {
      borderBottomWidth: 1,
      borderBottomColor: theme.palette.color.inputBorderColor,
      height: 40
    }
  });
}
