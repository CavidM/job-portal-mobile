import { StyleSheet } from 'react-native';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';

export default function useStyles() {
  const { theme } = useTheme() as ThemeContextType;

  return StyleSheet.create({
    validationWrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      position: 'absolute',
      right: 0,
      bottom: -20
    },
    validationText: {
      fontSize: 14,
      color: theme.palette.color.danger
    }
  });
}
