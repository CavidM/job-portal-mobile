import React, { useEffect, useState } from 'react';

import { View } from 'react-native';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';
import useFontStyles from '../common/font.style';
import Input, { InputProps } from '../Input/Input';

interface MaskedInputProps extends InputProps, TextInputMaskProps {
  placeholder: string
  onChangeValue: (text: string) => void
}

const MaskedInput: React.FC<MaskedInputProps> = (props) => {
  const {
    placeholder,
    error,
    errorMessage,
    ...rest
  } = props;

  const [state, setState] = useState('');
  const fontStyle = useFontStyles();

  useEffect(() => {
    props.onChangeValue(state);
  }, [state]);

  return (
    <View>
      <TextInputMask
        placeholder={placeholder}
        style={fontStyle.fontFamilyInterRegular}
        customTextInput={Input}
        customTextInputProps={{
          keyboardType: 'number-pad',
          error,
          errorMessage
        }}
        maxLength={17}
        value={state}
        onChangeText={(text) => {
          setState(text);
        }}
        {...rest}
      />
    </View>
  );
};

export default MaskedInput;
