import { StyleSheet } from 'react-native';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';

export default function useStyles() {
  const { theme } = useTheme() as ThemeContextType;

  return StyleSheet.create({
    options: {
      paddingBottom: 36,
      paddingHorizontal: 27,
      flexDirection: 'row'
    },
    textStyle: {
      color: theme.palette.color.dark,
      paddingStart: 17,
      fontSize: 18
    },
    plusIcon: {
      position: 'absolute',
      bottom: -28,
      left: '39%'
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 100 / 2
    }
  });
}
