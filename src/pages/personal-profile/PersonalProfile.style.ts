import { StyleSheet } from 'react-native';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import normalize from '../common/styles/normalize';

export function usePersonalProfileStyles() {
  const { theme } = useTheme() as ThemeContextType;

  return StyleSheet.create({
    accordion: {
      marginBottom: 20
    },
    personName: {
      marginTop: 20,
      marginBottom: 8,
      fontSize: normalize(22)
    },
    textEditInfo: {
      fontSize: normalize(15),
      color: theme.palette.color.primary
    }
  });
}
