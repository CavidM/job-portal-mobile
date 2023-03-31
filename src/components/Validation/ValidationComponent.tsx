import React from 'react';
import {
  Text, TextProps, View, ViewProps
} from 'react-native';
import useFontStyles from '../common/font.style';
import useStyles from './Validation.style';

export interface ValidationComponentProps extends ViewProps {
  errorMessage?: string
  textProps?: TextProps
}

const ValidationComponent: React.FC<ValidationComponentProps> = (props) => {
  const {
    errorMessage, textProps, ...rest
  } = props;
  const styles = useStyles();
  const fontStyle = useFontStyles();
  const { style } = rest;
  const textStyle = textProps?.style;
  return (
    <>
      <View {...rest} style={[styles.validationWrapper, style]}>
        <Text
          {...textProps}
          style={[styles.validationText, fontStyle.fontFamilyInterRegular, textStyle]}
        >
          {errorMessage}
        </Text>
      </View>
    </>

  );
};

export default ValidationComponent;
