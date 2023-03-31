import { StyleSheet } from 'react-native';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import normalize from '../../pages/common/styles/normalize';

export default function useStyles() {
  const { theme } = useTheme() as ThemeContextType;

  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: theme.palette.color.inputBorderColor
    },
    title: {
      fontSize: normalize(18),
      paddingBottom: 18,
      color: theme.palette.color.colorless
    },
    accordionChild: {
      paddingTop: 20
    }
  });
}
