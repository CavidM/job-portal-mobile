import { StyleSheet } from 'react-native';
import { ThemeContextType, useTheme } from '../../../../core/theme/Theme';
import normalize from '../../../common/styles/normalize';

export default function useStyles() {
  const { theme } = useTheme() as ThemeContextType;

  return StyleSheet.create({
    FilterOptionsLabel: {
      fontSize: normalize(15),
      paddingBottom: 15,
      fontFamily: 'InterMedium'
    },
    JobFilterApplyButton: {
      bottom: 0,
      backgroundColor: theme.palette.color.white,
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      height: normalize(111),
      alignItems: 'center'
    },
    FilterOptionalLabel: {
      textAlign: 'right',
      fontSize: normalize(12),
      color: theme.palette.color.muted,
      marginTop: 15,
      fontFamily: 'InterMedium'
    },
    SliderRangeValue: {
      textAlign: 'right',
      fontSize: normalize(15),
      color: theme.palette.color.muted,
      fontFamily: 'InterMedium'
    }
  });
}
