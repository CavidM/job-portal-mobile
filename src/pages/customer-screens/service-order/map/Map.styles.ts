import { StyleSheet } from 'react-native';
import { COLORS, isPlatformIOS } from '../../../../core/theme/Constants';
import normalize from '../../../common/styles/normalize';
import { ThemeContextType, useTheme } from '../../../../core/theme/Theme';

export const MapStyles = () => {
  const { theme } = useTheme() as ThemeContextType;
  return StyleSheet.create({
    markerFixed: {
      left: '50%',
      marginLeft: -17,
      marginTop: -50,
      position: 'absolute',
      top: '50%'
    },
    marker: {
      height: 50,
      width: 34
    },
    labelBox: {
      top: normalize(70),
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'transparent',
      backgroundColor: COLORS.white,
      padding: 10,
      height: normalize(37),
      alignSelf: 'center'
    },
    mapLabel: {
      color: COLORS.disabled,
      fontFamily: 'Rubik',
      fontSize: normalize(14)
    },
    myLocationBtn: {
      position: 'absolute',
      top: '45%',
      right: 10,
      backgroundColor: COLORS.white,
      borderRadius: 100 / 2
    },
    goBackBtn: {
      backgroundColor: COLORS.white,
      borderRadius: 100 / 2,
      width: normalize(35),
      height: normalize(35),
      top: normalize(70),
      position: 'absolute',
      left: normalize(20)
    },
    chooseButtonWrapper: {
      paddingBottom: normalize(48),
      bottom: 0,
      backgroundColor: 'transparent',
      position: 'absolute',
      alignSelf: 'center'
    },
    mapView: {
      borderRadius: 6
    },
    mapOnlyView: {
      borderRadius: 10,
      height: 150
    },
    mapSearchBar: {
      borderColor: COLORS.inputBorderColor,
      borderWidth: 1,
      width: '100%',
      height: 36,
      borderRadius: 6,
      paddingLeft: 17,
      fontSize: 13,
      color: COLORS.dark,
      fontFamily: 'InterMedium',
      marginTop: 15
    },
    nextButton: {
      justifyContent: 'flex-end',
      marginBottom: normalize(48),
      alignItems: 'center'
    },
    pageTitle: {
      fontFamily: 'InterRegular',
      fontSize: 25,
      color: COLORS.dark
    },
    autoCompleteDisabled: {
      fontSize: 13,
      paddingBottom: isPlatformIOS ? normalize(8) : normalize(8),
      color: theme.palette.color.muted
    }
  });
};
