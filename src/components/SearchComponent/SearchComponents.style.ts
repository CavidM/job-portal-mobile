import { StyleSheet } from 'react-native';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';

export default function useStyles() {
  const { theme } = useTheme() as ThemeContextType;

  return StyleSheet.create({
    searchResultDividerWrapper: {
      borderBottomWidth: 1,
      borderBottomColor: theme.palette.color.inputBorderColor
    },
    searchResultDivider: {
      fontSize: 14,
      marginVertical: 16,
      marginStart: 15
    }
  });
}
