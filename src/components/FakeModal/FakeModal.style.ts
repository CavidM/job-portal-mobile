import { StyleSheet } from 'react-native';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import normalize from '../../pages/common/styles/normalize';

export const FakeModalStyle = () => {
  const { theme } = useTheme() as ThemeContextType;

  return StyleSheet.create({
    bodyWrapper: {
      backgroundColor: theme.palette.color.white,
      marginBottom: normalize(50),
      width: normalize(320),
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingTop: 20,
      paddingBottom: 10,
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    modalWrapper: {
      flex: 1,
      backgroundColor: theme.palette.color.infoColor
    }
  });
};
