import { StyleSheet } from 'react-native';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import normalize from '../../pages/common/styles/normalize';

export default function useStyles() {
  const { theme } = useTheme() as ThemeContextType;

  return StyleSheet.create({
    CountdownTimerText: {
      color: theme.palette.color.textDark,
      fontSize: normalize(17),
      fontFamily: 'InterLight'
    }
  });
}
