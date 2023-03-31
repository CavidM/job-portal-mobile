import { StyleSheet } from 'react-native';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import normalize from '../../pages/common/styles/normalize';

export default function useStyles() {
  const { theme } = useTheme() as ThemeContextType;

  return StyleSheet.create({
    buttonText: {
      position: 'absolute',
      left: normalize(21),
      top: normalize(50),
      fontSize: normalize(17),
      color: theme.palette.color.textWhite
    },
    stepContainerStyle: {
      position: 'absolute',
      right: normalize(20),
      top: normalize(50),
      width: normalize(24),
      height: normalize(24),
      borderRadius: 100 / 2,
      backgroundColor: theme.palette.color.white,
      justifyContent: 'center'
    },
    stepTextStyle: {
      textAlign: 'center',
      fontSize: normalize(13),
      color: theme.palette.color.primary
    },
    disabledText: {
      color: theme.palette.color.disabled
    },
    disabledStepStyle: {
      backgroundColor: theme.palette.color.disabled
    },
    disabledStepTextStyle: {
      color: theme.palette.color.white
    },
    wrapper: {
      width: '100%'
    },
    buttonWrapper: {
      width: '83%',
      left: '8.5%'
    },
    dotContainer: {
      flex: 1,
      flexDirection: 'row',
      position: 'absolute',
      top: normalize(13),
      left: normalize(115),
      width: normalize(83),
      justifyContent: 'space-between',
      zIndex: 9
    }
  });
}
