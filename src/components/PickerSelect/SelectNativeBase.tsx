import React from 'react';
import {
  Select,
  VStack
} from 'native-base';
import { ISelectProps } from 'native-base/src/components/primitives/Select/types';
import {Keyboard, View} from 'react-native';
import ValidationComponent from '../Validation/ValidationComponent';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import useFontStyles from '../common/font.style';
import ErrorIcon from '../Icons/ErrorIcon';
import normalize from '../../pages/common/styles/normalize';

interface selectNativeBaseProps extends ISelectProps {
  items: any;
  placeholder: string;
  error?: boolean;
  errorMessage?: string;
  style?: any,
  errorIconStyle?: any;
}
export const SelectNativeBase = (props: selectNativeBaseProps) => {
  const { theme } = useTheme() as ThemeContextType;
  const fontStyle = useFontStyles();
  const {
    items, placeholder, error, errorMessage, style, errorIconStyle, ...rest
  } = props;
  return (
    <VStack alignItems="center" style={style} onTouchStart={Keyboard.dismiss}>
      <Select
        // @ts-ignore
        style={[fontStyle.fontFamilyInterRegular, { fontSize: 18 }, style]}
        color={theme.palette.color.dark}
        borderBottomColor={
          error ? theme.palette.color.danger
            : theme.palette.color.inputBorderColor
        }
        minWidth="100%"
        testID={`select-picker-${placeholder}`}
        placeholder={placeholder}
        placeholderTextColor={theme.palette.color.darkGray}
        _selectedItem={{
          bg: theme.palette.color.primary,
          _text: { color: theme.palette.color.white }
        }}
        {...rest}
      >
        {
          items.map((item: any, i: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <Select.Item key={i} label={item.label} value={item.value} />

          ))
        }
      </Select>
      {
        error
        && (
          <>
            <View style={{
              position: 'absolute', right: normalize(35), top: normalize(20), ...errorIconStyle
            }}
            >
              <ErrorIcon />
            </View>
            <ValidationComponent errorMessage={errorMessage} />
          </>
        )
      }
    </VStack>
  );
};
