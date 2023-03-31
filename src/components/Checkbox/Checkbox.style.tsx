import { StyleSheet } from 'react-native';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import normalize from '../../pages/common/styles/normalize';
import { isPlatformIOS } from '../../core/theme/Constants';

export default function useStyles() {
  const { theme } = useTheme() as ThemeContextType;

  return StyleSheet.create({
    Checkbox: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20
    },
    CheckboxLabel: {
      color: theme.palette.color.primary,
      fontFamily: 'InterMedium',
      fontSize: 12
    },
    CheckboxTypeMultiple: {
      borderWidth: 1,
      borderRadius: 100 / 2,
      borderColor: theme.palette.color.primary,
      paddingVertical: 10
    },
    CheckboxTypeMultipleSelected: {
      backgroundColor: theme.palette.color.primary
    },
    CheckboxTypeMultipleSelectedLabel: {
      color: theme.palette.color.white
    },
    CheckboxTypeSingleSelectedLabel: {
      color: theme.palette.color.primary
    },
    CheckboxTypeSingle: {
      marginVertical: 1.5,
      textAlign: 'center',
      width: normalize(65),
      fontSize: 10,
      fontFamily: 'InterMedium'
    },
    CheckboxTypeSingleLabel: {
      color: theme.palette.color.dark
    },
    CheckboxTypeSingleSelected: {
      backgroundColor: theme.palette.color.white,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme.palette.color.gray,
      height: 37
    },
    CheckboxList: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    CheckboxSingleList: {
      backgroundColor: theme.palette.color.checkboxBgColor,
      height: 37,
      borderRadius: 8,
      width: isPlatformIOS ? normalize(324) : normalize(327),
      justifyContent: 'space-around'
    }
  });
}
