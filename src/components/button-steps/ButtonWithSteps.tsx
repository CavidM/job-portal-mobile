import React from 'react';
import {
  TouchableOpacity, Text, View, TouchableOpacityProps
} from 'react-native';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import NextButtonIcon from '../Icons/NextButtonIcon';
import useStyles from '../button-steps/ButtonSteps.style';
import DotIcon from '../Icons/DotIcon';
import useFontStyles from '../common/font.style';

export interface ButtonWithStepsProps extends TouchableOpacityProps {
  disabled?: boolean
  step?: number,
  onPress: () => void,
  title: string
}

const DotContainer = ({ children, styles }: any) => (
  <View style={styles.dotContainer}>
    {children}
  </View>
);
const ButtonWithSteps: React.FC<ButtonWithStepsProps> = (props) => {
  const styles = useStyles();
  const fontStyle = useFontStyles();

  const { theme } = useTheme() as ThemeContextType;
  const { grey, primary } = theme.palette.color;

  const {
    disabled,
    step,
    title,
    onPress
  } = props;
  const textStyle: [Object] = [styles.buttonText];
  const stepContainerStyle: [Object] = [styles.stepContainerStyle];
  const stepTextStyle: [Object] = [styles.stepTextStyle];

  const dots: any[] = [];

  for (let i = 1; i <= 5; i += 1) {
    let prop = {};
    const defaultColor = disabled ? theme.palette.color.disabled : theme.palette.color.stepColor;
    if (i === step) {
      prop = { ...prop, color: 'white' };
    }

    dots.push(<DotIcon defaultColor={defaultColor} key={i} {...prop} />);
  }

  if (disabled) {
    textStyle.push(styles.disabledText);
    stepContainerStyle.push(styles.disabledStepStyle);
    stepTextStyle.push(styles.disabledStepTextStyle);
  }
  return (
    <View style={styles.wrapper} accessible>
      <View style={styles.buttonWrapper} nativeID="5">
        <DotContainer styles={styles}>
          {dots}
        </DotContainer>
        <TouchableOpacity
          disabled={!!disabled}
          onPress={onPress}
          accessible
          accessibilityState={{ disabled: !!disabled }}
          accessibilityLabel="registration-next-step-button"
        >
          <NextButtonIcon color={disabled ? grey : primary} />
          <Text style={[textStyle, fontStyle.fontFamilyInterRegular]}>{title}</Text>
          <View style={stepContainerStyle}>
            <Text style={[stepTextStyle, fontStyle.fontFamilyInterRegular]}>{step}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ButtonWithSteps;
