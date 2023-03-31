import { StyleSheet } from 'react-native';
import { ThemeContextType, useTheme } from '../../../../core/theme/Theme';
import normalize from '../../../common/styles/normalize';
import useFontStyles from '../../../../components/common/font.style';

export const UsersSearchResultStyle = (selected: boolean = false) => {
  const { theme } = useTheme() as ThemeContextType;
  const fonts = useFontStyles();

  return StyleSheet.create({
    itemContainer: {
      backgroundColor: theme.palette.color.white,
      width: normalize(334),
      height: normalize(107),
      marginVertical: 5,
      borderRadius: 15
    },
    starIconStyle: {
      marginLeft: 7,
      marginRight: 5,
      marginTop: 4
    },
    selectedFlag: {
      backgroundColor: selected ? theme.palette.color.primary : '#C4C4C4',
      height: normalize(107),
      width: normalize(40),
      position: 'absolute',
      right: 0,
      top: 0,
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15
    },
    submitButtonWrapper: {
      position: 'absolute',
      bottom: 0,
      backgroundColor: theme.palette.color.white,
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      height: normalize(111),
      alignItems: 'center',
      width: '100%'
    },
    searchResultLabel: {
      fontSize: 15,
      fontFamily: 'InterMedium',
      color: theme.palette.color.infoColor,
      textAlign: 'center',
      paddingTop: 15
    },
    scheduleTextWrapper: {
      marginBottom: 20
    },
    scheduleText: {
      fontSize: 14,
      ...fonts.fontFamilyInterMedium,
      textAlign: 'center'
    },
    scheduleDateButton: {
      ...fonts.fontFamilyInterMedium,
      fontSize: 13
    }
  });
};
