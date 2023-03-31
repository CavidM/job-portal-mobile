import React from 'react';
import MultiSlider, { MultiSliderProps } from '@ptomasroos/react-native-multi-slider';
import { Platform, StyleSheet, View } from 'react-native';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import { COLORS } from '../../core/theme/Constants';

interface SliderProps extends MultiSliderProps{

}
export const SliderComponent: React.FC<SliderProps> = (props) => {
  const { theme } = useTheme() as ThemeContextType;
  const {
    children,
    ...rest
  } = props;
  const styles = StyleSheet.create({
    markerStyle: {
      height: 28,
      width: 28,
      shadowColor: COLORS.dark,
      marginTop: 7,
      marginLeft: 22,
      backgroundColor: COLORS.white,
      borderColor: COLORS.gray,
      borderWidth: 1,
      borderRadius: 100 / 2,
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowRadius: 1,
      shadowOpacity: 0.1
    }
  });
  return (
    <View>
      <View>
        <View>
          {children}
        </View>
        <MultiSlider
          {...rest}
          markerStyle={{
            ...Platform.select({
              ios: styles.markerStyle,
              android: styles.markerStyle
            })
          }}
            // @ts-ignore
          disabledMarkerStyle={{
            ...Platform.select({
              ios: styles.markerStyle,
              android: styles.markerStyle
            })
          }}
          pressedMarkerStyle={{
            ...Platform.select({
              android: {
                height: 28,
                width: 28
              }
            })
          }}
          selectedStyle={{
            // eslint-disable-next-line react/destructuring-assignment
            backgroundColor: props.enabledOne || props.enabledOne === undefined
              ? theme.palette.color.primary
              : COLORS.muted
          }}
          trackStyle={{
            backgroundColor: COLORS.checkboxBgColor,
            height: 10,
            borderRadius: 10
          }}
          touchDimensions={{
            height: 40,
            width: 40,
            borderRadius: 20,
            slipDisplacement: 40
          }}
          allowOverlap={false}
          minMarkerOverlapDistance={10}
        />
      </View>
    </View>
  );
};
