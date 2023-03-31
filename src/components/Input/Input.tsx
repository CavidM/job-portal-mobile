import React from 'react';
import {
  SafeAreaView, TextInput, TextInputProps, View
} from 'react-native';
import { InputVariants, InputVariantTypes } from '../../core/theme/Constants';
import useFontStyles from '../common/font.style';
import ErrorIcon from '../Icons/ErrorIcon';
import ValidationComponent from '../Validation/ValidationComponent';
import useStyles from './Input.style';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';

export interface InputProps extends TextInputProps {
  error?: boolean,
  errorMessage?: string,
  placeholder: string,
  variant?: InputVariantTypes,
  icon?: React.ReactNode,
  width?: number
}

const Input: React.FC<InputProps> = (props) => {
  const { theme } = useTheme() as ThemeContextType;
  const styles = useStyles();
  const fontStyle = useFontStyles();

  const {
    style,
    error,
    errorMessage,
    placeholder,
    variant,
    icon,
    width,
    ...rest
  } = props;

  const inputStyle: [Object] = [styles.input];
  const iconStyle: [Object] = [{}];

  if (error) {
    inputStyle.push({ borderBottomColor: 'red' });
  }

  switch (variant) {
    case InputVariants.outline: {
      inputStyle.push((styles.inputOutline));
      break;
    }
    default: {
      break;
    }
  }
  if (icon) {
    inputStyle.push(styles.inputWithIcon);
    iconStyle.push(styles.inputIcon);
  }
  return (
    <SafeAreaView style={style}>
      <View>
        <TextInput
          accessible
          accessibilityLabel={`text-input-${placeholder}`}
          placeholder={placeholder}
          style={[inputStyle, fontStyle.fontFamilyInterRegular, { width }, style]}
          placeholderTextColor={theme.palette.color.darkGray}
          {...rest}
        />
        <View style={iconStyle}>
          {icon}
        </View>
      </View>

      {error
        && (
          <>
            <View style={{ position: 'absolute', right: 13, top: 5 }}>
              <ErrorIcon />
            </View>
            <ValidationComponent errorMessage={errorMessage} />
          </>

        )}

    </SafeAreaView>
  );
};

export default Input;
