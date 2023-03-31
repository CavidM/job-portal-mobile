import { StyleSheet } from 'react-native';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';

export default function useStyles() {
  const { theme } = useTheme() as ThemeContextType;

  return StyleSheet.create({
    centeredView: {
      width: '100%',
      height: '100%'
    },
    modalView: {
      position: 'absolute',
      bottom: 0,
      backgroundColor: 'white',
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
      shadowColor: theme.palette.color.dark,
      shadowOffset: {
        width: 0,
        height: 2
      },
      width: '100%',
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    closeIcon: {
      alignSelf: 'center',
      width: 45,
      height: 5,
      borderRadius: 3,
      backgroundColor: theme.palette.color.primary
    },
    closeButton: {
      paddingBottom: 30,
      paddingTop: 20
    }
  });
}
