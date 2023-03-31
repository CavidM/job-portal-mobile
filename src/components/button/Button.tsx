import React from 'react';
import {
  TouchableOpacity, Text, TouchableOpacityProps, TextProps
} from 'react-native';
import {
  ButtonVariants, ButtonVariantTypes, SizeType, SIZE
} from '../../core/theme/Constants';
import useFontStyles from '../common/font.style';
import useStyles from './Button.style';

/**
 * @todo Bad abstraction. The child component "Button" should be able to replace
 * all methods and attributes of parent components "TouchableOpacityProps"
 * @reference https://en.wikipedia.org/wiki/Liskov_substitution_principle
 *
 * Example. The component does not allow to use the properties from TouchableOpacityProps
 * but the Component itself extend from TouchableOpacity.
 * If you want to use "disable" property you need to change (add) it manually to this component
 * Open closed principle is break
 * @reference https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle#:~:text=In%20object%2Doriented%20programming%2C%20the,without%20modifying%20its%20source%20code.
 */

interface ButtonProps extends TouchableOpacityProps {
  size?: SizeType
  variant: ButtonVariantTypes
  color?: string | undefined
  title: string
  shadow?: Boolean
  icon?: React.ReactNode
  onPress: () => void,
  selected?: boolean,
  buttonTextStyle?: any,
  width?: number,
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = (props) => {
  const styles = useStyles();
  const fontStyle = useFontStyles();

  const {
    variant, icon, onPress, title, buttonTextStyle, width,
    size = SIZE.md, shadow = false, selected = false, color = undefined,
    disabled,
    ...rest
  } = props;

  const buttonStyle: [Object] = [styles.button];
  const textStyle: [Object] = [styles.buttonText];
  switch (variant) {
    case ButtonVariants.primary: {
      buttonStyle.push(styles[ButtonVariants.primary]);
      textStyle.push(styles.primaryButtonText);
      break;
    }
    case ButtonVariants.outline: {
      buttonStyle.push(styles[ButtonVariants.outline]);
      break;
    }
    case ButtonVariants.default: {
      buttonStyle.push(styles[ButtonVariants.default]);
      break;
    }
    case ButtonVariants.secondary: {
      buttonStyle.push(styles[ButtonVariants.secondary]);
      break;
    }
    default: {
      break;
    }
  }
  if (icon) {
    textStyle.push(styles.iconButtonText);
    buttonStyle.push(styles.buttonIcon);
  }
  if (shadow) {
    buttonStyle.push(styles.shadow);
  }
  if (selected) {
    buttonStyle.push(styles.selected);
  }

  switch (size) {
    case SIZE.sm: {
      buttonStyle.push(styles.buttonSizeSm);
      break;
    }
    case SIZE.md: {
      buttonStyle.push(styles.buttonSizeMd);
      break;
    }
    case SIZE.lg: {
      buttonStyle.push(styles.buttonSizeLg);
      break;
    }
    default: {
      break;
    }
  }

  if (color) {
    buttonStyle.push({
      backgroundColor: color
    });
  }

  return (
    // @ts-ignore
    <TouchableOpacity
      {...rest}
      style={[buttonStyle, width && { width },
        { ...rest.style }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[textStyle, fontStyle.fontFamilyInterRegular, buttonTextStyle]}>{title}</Text>
      {icon}
    </TouchableOpacity>
  );
};

export default Button;
