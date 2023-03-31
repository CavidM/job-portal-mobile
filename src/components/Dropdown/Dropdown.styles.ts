import { StyleSheet } from 'react-native';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import normalize from '../../pages/common/styles/normalize';

export default function useStyles() {
  const { theme } = useTheme() as ThemeContextType;

  return StyleSheet.create({
    Dropdown: {
      borderWidth: 1,
      borderColor: theme.palette.color.cardBorderColor,
      width: normalize(324),
      borderRadius: 8,
      marginTop: 10,
      backgroundColor: theme.palette.color.white
    },
    DropdownItem: {
      paddingTop: 24,
      paddingHorizontal: 17,
      fontSize: 14
    },
    DropdownItemSelected: {
      color: theme.palette.color.primary
    }
  });
}
